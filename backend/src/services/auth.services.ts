import prisma from "../config/prisma";
import { User } from "@prisma/client";
import { ServiceResponse } from "../utils/serviceResponse";
import { jwtService } from "./jwt.services";

export class AuthService {
  /**
   * Login user by phone number
   */
  async login(phoneNumber: string) {
    const user = await prisma.user.findUnique({
      where: { phoneNumber },
    });

    if (!user) {
      return ServiceResponse.failed("User not found", 404);
    }

    // Update user to online
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        isOnline: true,
        lastSeen: null,
      },
    });

    // Issue JWT token
    const token = jwtService.issueToken({
      userId: updatedUser.id,
      phoneNumber: updatedUser.phoneNumber,
    });

    return ServiceResponse.success(
      { user: updatedUser, token },
      "User logged in successfully"
    );
  }

  /**
   * Login user by user ID
   */
  async loginById(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return ServiceResponse.failed("User not found", 404);
    }

    // Update user to online
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        isOnline: true,
        lastSeen: null,
      },
    });

    // Issue JWT token
    const token = jwtService.issueToken({
      userId: updatedUser.id,
      phoneNumber: updatedUser.phoneNumber,
    });

    return ServiceResponse.success(
      { user: updatedUser, token },
      "User logged in successfully"
    );
  }
}

// Export singleton instance
export const authService = new AuthService();
