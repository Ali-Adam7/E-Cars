import { RequestHandler } from "express";
import { DAO } from "./DAO";
import { VisitEvent } from "@prisma/client";

const dao = new DAO();

export const recrodEvent: RequestHandler = async (req, res) => {
  try {
    const record = { ...req.body, carID: parseInt(req.body.carID) } as VisitEvent;
    const event = await dao.recrodEvent(record);
    res.status(201).send(event);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const getUsageReportByID: RequestHandler = async (req, res) => {
  try {
    const usuage = await dao.getUsageReportByID();
    const ans: { [x: string]: number }[] = [];
    usuage.forEach((entry) => {
      if (ans[entry.carID]) ans[entry.carID][entry.eventType] = entry._count.eventType;
      else {
        ans[entry.carID] = { vid: entry.carID };
        ans[entry.carID][entry.eventType] = entry._count.eventType;
      }
    });
    const filtered = ans.filter((element) => element !== null);
    res.send(filtered);
  } catch (error) {
    res.sendStatus(500);
  }
};
