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
    res.json(createProject);
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
      res.json(createManager);
    } else {
      res.json({ success: false, message: "Failed to create manager." });
    }
  },
};
