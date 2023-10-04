import { prisma } from "../prismaClient";
import { Request, Response } from "express";

export default {
  createClient: async (req: Request, res: Response) => {
    const { clientName } = req.body ?? {};
    const client = await prisma.clientProject.create({
      data: {
        clientName: clientName
      },
    });
    res.json(client);
  },
  createProject: async (req: Request, res: Response) => {
    const { clientId,clientName, estimateHours } = req.body ?? {};
    const client = await prisma.estimateProject.create({
      data: {
        clientId: clientId,
        clientName: clientName,
        estimateHours: estimateHours
      },
    });
    res.json(client);
  },
};
