import { RequestHandler } from "express";
import { DAO } from "./DAO";
import { VisitEvent } from "@prisma/client";
import { transform } from "./util";

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

export const getUsageReport: RequestHandler = async (req, res) => {
  try {
    const usuage = await dao.getUsageReport();
    res.send(transform(usuage));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export const getUsageReportByID: RequestHandler = async (req, res) => {
  try {
    const usuage = await dao.getUsageReportByID(parseInt(req.params.id));
    res.send(transform(usuage));
  } catch (error) {
    console.log(error);

    res.sendStatus(500);
  }
};
