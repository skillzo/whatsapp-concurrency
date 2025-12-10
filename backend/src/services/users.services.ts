import prisma from "../config/prisma";
import { User } from "@prisma/client";
import { ServiceResponse } from "../utils/serviceResponse";
import { CreateUserDto, UpdateUserDto } from "../types/users.types";
import { jwtService } from "./jwt.services";
import { authService } from "./auth.services";

export class UserService {
  constructor() {}

  /**
   * Create a new user or login if user already exists
   */
  async createUser(data: CreateUserDto) {
    // Check if user with phone number already exists
    const existingUser = await prisma.user.findUnique({
      where: { phoneNumber: data.phoneNumber },
    });

    if (existingUser) {
      // Login existing user
      return await authService.login(data.phoneNumber);
    }

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        phoneNumber: data.phoneNumber,
        isOnline: true,
      },
    });

    // Issue JWT token for new user
    const token = jwtService.issueToken({
      userId: newUser.id,
      phoneNumber: newUser.phoneNumber,
    });

    return ServiceResponse.success(
      { user: newUser, token },
      "User created successfully"
    );
  }

  /**
   * Get user by ID
   */
  async getUserById(userId: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { id: userId },
    });
  }

  /**
   * Get user by phone number
   */
  async getUserByPhoneNumber(phoneNumber: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { phoneNumber },
    });
  }

  /**
   * Update user
   */
  async updateUser(userId: string, data: UpdateUserDto): Promise<User> {
    return await prisma.user.update({
      where: { id: userId },
      data,
    });
  }

  /**
   * Update online status
   */
  async updateOnlineStatus(userId: string, isOnline: boolean): Promise<User> {
    return await prisma.user.update({
      where: { id: userId },
      data: {
        isOnline,
        lastSeen: isOnline ? null : new Date(),
      },
    });
  }

  /**
   * Search users by phone number (for adding contacts)
   */
  async searchUsersByPhoneNumber(
    phoneNumber: string,
    limit: number = 10
  ): Promise<User[]> {
    return await prisma.user.findMany({
      where: {
        phoneNumber: {
          contains: phoneNumber,
        },
      },
      take: limit,
    });
  }

  /**
   * Get multiple users by IDs
   */
  async getUsersByIds(userIds: string[]): Promise<User[]> {
    return await prisma.user.findMany({
      where: {
        id: {
          in: userIds,
        },
      },
    });
  }
}
