export const ENV = {
  APP: {
    PORT: process.env.PORT || 8000,
    JWT_SECRET: process.env.JWT_SECRET || "secret",
    MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017",
    MONGODB_DB_NAME: process.env.MONGODB_DB_NAME || "whatsapp",
    DATABASE_URL:
      process.env.DATABASE_URL ||
      "postgresql://postgres:postgres@localhost:5432/whatsapp",
    EXPIRES_IN: process.env.EXPIRES_IN || "7d",
  },
};
