import jwt from "jsonwebtoken";
import { ENV } from "../config/env";

export interface JwtPayload {
  userId: string;
  phoneNumber?: string;
  [key: string]: any;
}

export interface TokenOptions {
  expiresIn?: string | number;
}

export class JwtService {
  private readonly secret: string;
  private readonly defaultExpiresIn: string = "7d";
  private readonly issuer: string;

  constructor() {
    this.secret = ENV.APP.JWT_SECRET;
    this.defaultExpiresIn = ENV.APP.EXPIRES_IN;
    this.issuer = "whatsapp-backend";
  }

  issueToken(payload: JwtPayload, options?: TokenOptions): string {
    try {
      const expiresIn: string | number =
        options?.expiresIn ?? this.defaultExpiresIn;

      return jwt.sign(payload, this.secret, {
        expiresIn: expiresIn! as any,
        issuer: this.issuer,
      });
    } catch (error) {
      throw new Error(
        `Failed to issue token: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  verifyToken(token: string): JwtPayload {
    try {
      const decoded = jwt.verify(token, this.secret, {
        issuer: this.issuer,
      }) as JwtPayload;

      return decoded;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error("Token has expired");
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new Error("Invalid token");
      }
      throw new Error(
        `Token verification failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  decodeToken(token: string): JwtPayload | null {
    try {
      return jwt.decode(token) as JwtPayload;
    } catch {
      return null;
    }
  }
}

// Export singleton instance
export const jwtService = new JwtService();
