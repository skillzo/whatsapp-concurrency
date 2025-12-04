import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import prisma from "./config/prisma";

dotenv.config();

const app = express();
dotenv.config();
const wsServer = createServer(app);
const io = new Server(wsServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
  pingTimeout: 60000,
  pingInterval: 30000,
});

// const prisma = new PrismaClient();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok", message: "Server is running" });
});

// Example route
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "WhatsApp Backend API" });
});

// Start server
wsServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Graceful shutdown
process.on("beforeExit", async () => {
  await prisma.$disconnect();
  //  await disconnectMongoDb()
  console.log("server stopped");
});
