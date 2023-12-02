import { PrismaClient, VisitEvent } from "@prisma/client";
import dotenv from "dotenv";
const prisma = new PrismaClient();
dotenv.config();

export class DAO {
  recrodEvent = async (record: VisitEvent) => {
    try {
      const event = await prisma.visitEvent.create({ data: record });

      return event;
    } catch (error) {
      throw error;
    }
  };
  getUsageReport = async () => {
    try {
      const report = await prisma.visitEvent.groupBy({
        by: ["eventType", "year", "month"],
        _count: true,
      });
      return report;
    } catch (error) {
      throw error;
    }
  };

  getUsageReportByID = async (id: number) => {
    try {
      const report = await prisma.visitEvent.groupBy({
        by: ["year", "month", "carID", "eventType"],
        _count: true,
        having: { carID: id },
      });

      return report;
    } catch (error) {
      throw error;
    }
  };
}
