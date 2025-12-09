export interface CreateContactDto {
  ownerId: string;
  contactId: string;
  name?: string;
}

export interface UpdateContactDto {
  name?: string;
}
