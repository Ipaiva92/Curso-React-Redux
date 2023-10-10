import { prisma } from "../prismaClient";
import { Request, Response } from "express";

export default {
  createProject: async (req: Request, res: Response) => {
    const { name, userId } = req.body ?? {};

    const managerId = await prisma.manager.findFirst({
      where: { userId: userId },
      select: { id: true },
    });

    const createProject = await prisma.project.create({
      data: {
        name: name,
        manager: { connect: { id: managerId?.id } },
      },
    });
    res.status(201).json(createProject);
  },
  createManager: async (req: Request, res: Response) => {
    const { userId } = req.body ?? {};
    const findUser = await prisma.user.findUnique({ where: { id: userId } });
    const findManager = await prisma.manager.findFirst({
      where: { userId: userId },
    });

    if (findUser && !findManager) {
      const createManager = await prisma.manager.create({
        data: {
          userId: userId,
        },
      });
      res.status(201).json(createManager);
    } else {
      res.status(400).json({ success: false, message: "Failed to create manager." });
    }
  },
};
