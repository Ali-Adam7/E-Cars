import { PrismaClient, VisitEvent } from "@prisma/client";
import dotenv from "dotenv";
const prisma = new PrismaClient();
dotenv.config();

export class DAO {
  recrodEvent = async (record: VisitEvent) => {
    try {
      return await prisma.visitEvent.create({ data: record });
    } catch (error) {
      throw error;
    }
  };
  getUsageReport = async () => {
    try {
      return await prisma.visitEvent.groupBy({
        by: ["eventType", "year", "month"],
        _count: true,
      });
    } catch (error) {
      throw error;
    }
  };

  getUsageReportByID = async (id: number) => {
    try {
      return await prisma.visitEvent.groupBy({
        by: ["year", "month", "carID", "eventType"],
        _count: true,
        having: { carID: id },
      });
    } catch (error) {
      throw error;
    }
  };
}
