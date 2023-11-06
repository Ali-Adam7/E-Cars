import dotenv from "dotenv";
import fs from "fs";
import path from "path";
dotenv.config();
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export class DAO {
  registerUser = async (user: User) => {
    try {
      const createdUser = await prisma.user.create({ data: user });
      return createdUser;
    } catch (error: any) {
      return error;
    }
  };
  getUserByEmail = async (email: string) => {
    try {
      const user = await prisma.user.findUnique({ where: { email: email } });
      return user;
    } catch (error: any) {
      return error;
    }
  };
}
