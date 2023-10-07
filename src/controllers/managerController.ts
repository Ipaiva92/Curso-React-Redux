import { Role } from "@prisma/client";
import { prisma } from "../prismaClient";
import { Request, Response } from "express";

export default {
  createProject: async (req: Request, res: Response) => {
    const { name, userId, managerEmail } = req.body ?? {};
    const findUser = await prisma.user.findUnique({ where: { id: userId } });
    if (findUser?.type === Role.Manager) {
      const createProject = await prisma.project.create({
        data: {
          name: name,
          manager: { connect: { id: managerEmail } },
        },
      });
      res.json(createProject);
    } else {
      res.json({
        success: false,
        message: "This user does not have permission to create a project.",
      });
    }
  },
  createManager: async (req: Request, res: Response) => {
    const { userId } = req.body ?? {};
    const findUser = await prisma.user.findUnique({ where: { id: userId } });
    const findManager = await prisma.manager.findMany({
      where: { userId: userId },
    });

    if (findUser && !findManager.length) {
      const createManager = await prisma.manager.create({
        data: {
          userId: userId,
        },
      });
      res.json(createManager);
    } else {
      res.json({ success: false, message: "Failed to create manager." });
    }
  },
};
