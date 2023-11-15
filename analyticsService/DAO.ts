const mysql = require("mysql2/promise");
import { PrismaClient, VisitEvent } from "@prisma/client";
import { count } from "console";
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
      const report = await prisma.visitEvent.groupBy({ by: ["eventType"], _count: { eventType: true } });
      console.log(report);
      return report;
    } catch (error) {
      throw error;
    }
  };

  getUsageReportByID = async () => {
    try {
      const report = await prisma.visitEvent.groupBy({ by: ["eventType", "carID"], _count: { eventType: true } });
      return report;
    } catch (error) {
      throw error;
    }
  };
}
