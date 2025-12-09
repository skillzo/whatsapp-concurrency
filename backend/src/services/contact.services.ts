import prisma from "../config/prisma";
import { Contact } from "@prisma/client";
import { ServiceResponse } from "../utils/serviceResponse";
import { CreateContactDto, UpdateContactDto } from "../types/contact.types";

export class ContactService {
  /**
   * Add a new contact
   */
  async addContact(data: CreateContactDto) {
    try {
      if (data.ownerId === data.contactId) {
        return ServiceResponse.failed("Cannot add yourself as a contact", 400);
      }

      // Check if contact user exists
      const contactUser = await prisma.user.findUnique({
        where: { id: data.contactId },
      });

      if (!contactUser) {
        return ServiceResponse.failed("Contact user not found", 404);
      }

      // Check if contact already exists
      const existingContact = await prisma.contact.findUnique({
        where: {
          ownerId_contactId: {
            ownerId: data.ownerId,
            contactId: data.contactId,
          },
        },
      });

      if (existingContact) {
        return ServiceResponse.failed("Contact already exists", 409);
      }

      const contact = await prisma.contact.create({
        data: {
          ownerId: data.ownerId,
          contactId: data.contactId,
          name: data.name || null,
        },
        include: {
          contact: {
            select: {
              id: true,
              name: true,
              phoneNumber: true,
              isOnline: true,
              lastSeen: true,
            },
          },
        },
      });

      return ServiceResponse.success(contact, "Contact added successfully");
    } catch (error) {
      return ServiceResponse.failed(
        error instanceof Error ? error.message : "Failed to add contact",
        500
      );
    }
  }

  /**
   * Get all contacts for a user
   */
  async getContactsByOwnerId(ownerId: string) {
    try {
      const contacts = await prisma.contact.findMany({
        where: { ownerId },
        include: {
          contact: {
            select: {
              id: true,
              name: true,
              phoneNumber: true,
              isOnline: true,
              lastSeen: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return ServiceResponse.success(contacts);
    } catch (error) {
      return ServiceResponse.failed(
        error instanceof Error ? error.message : "Failed to get contacts",
        500
      );
    }
  }

  /**
   * Get a specific contact
   */
  async getContactById(contactId: string, ownerId: string) {
    try {
      const contact = await prisma.contact.findUnique({
        where: {
          ownerId_contactId: {
            ownerId,
            contactId,
          },
        },
        include: {
          contact: {
            select: {
              id: true,
              name: true,
              phoneNumber: true,
              isOnline: true,
              lastSeen: true,
            },
          },
        },
      });

      if (!contact) {
        return ServiceResponse.failed("Contact not found", 404);
      }

      return ServiceResponse.success(contact);
    } catch (error) {
      return ServiceResponse.failed(
        error instanceof Error ? error.message : "Failed to get contact",
        500
      );
    }
  }

  /**
   * Update contact name
   */
  async updateContact(
    contactId: string,
    ownerId: string,
    data: UpdateContactDto
  ) {
    try {
      const contact = await prisma.contact.findUnique({
        where: {
          ownerId_contactId: {
            ownerId,
            contactId,
          },
        },
      });

      if (!contact) {
        return ServiceResponse.failed("Contact not found", 404);
      }

      const updatedContact = await prisma.contact.update({
        where: {
          ownerId_contactId: {
            ownerId,
            contactId,
          },
        },
        data: {
          name: data.name,
        },
        include: {
          contact: {
            select: {
              id: true,
              name: true,
              phoneNumber: true,
              isOnline: true,
              lastSeen: true,
            },
          },
        },
      });

      return ServiceResponse.success(
        updatedContact,
        "Contact updated successfully"
      );
    } catch (error) {
      return ServiceResponse.failed(
        error instanceof Error ? error.message : "Failed to update contact",
        500
      );
    }
  }

  /**
   * Delete a contact
   */
  async deleteContact(contactId: string, ownerId: string) {
    try {
      const contact = await prisma.contact.findUnique({
        where: {
          ownerId_contactId: {
            ownerId,
            contactId,
          },
        },
      });

      if (!contact) {
        return ServiceResponse.failed("Contact not found", 404);
      }

      await prisma.contact.delete({
        where: {
          ownerId_contactId: {
            ownerId,
            contactId,
          },
        },
      });

      return ServiceResponse.success(null, "Contact deleted successfully");
    } catch (error) {
      return ServiceResponse.failed(
        error instanceof Error ? error.message : "Failed to delete contact",
        500
      );
    }
  }

  /**
   * Check if contact exists
   */
  async contactExists(ownerId: string, contactId: string) {
    try {
      const contact = await prisma.contact.findUnique({
        where: {
          ownerId_contactId: {
            ownerId,
            contactId,
          },
        },
      });

      return ServiceResponse.success(!!contact);
    } catch (error) {
      return ServiceResponse.failed(
        error instanceof Error ? error.message : "Failed to check contact",
        500
      );
    }
  }
}
