import dotenv from "dotenv";
import fs from "fs";
import path from "path";
dotenv.config();
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export class DAO {
  registerUser = async (user: User) => {
    try {
      return await prisma.user.create({ data: user });
    } catch (error: any) {
      throw error;
    }
  };
  getUserByEmail = async (email: string) => {
    try {
      return await prisma.user.findUnique({ where: { email: email } });
    } catch (error: any) {
      throw error;
    }
  };

  getUserByID = async (id: number) => {
    try {
      return await prisma.user.findUnique({ where: { id: id }, select: { firstName: true } });
    } catch (error: any) {
      throw error;
    }
  };
}
