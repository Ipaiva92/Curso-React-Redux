import { prisma } from "../prismaClient";
import { Request, Response } from "express";

export default {
  createTask: async (req: Request, res: Response) => {
    const { name, description, projectId, estimatedLength } = req.body ?? {};
    try {
      const projectIdExist = await prisma.project.findUnique({
        where: { id: projectId },
        select: { id: true },
      });
      if (projectIdExist) {
        const user = await prisma.task.create({
          data: {
            name: name,
            description: description,
            projectId: projectId,
            estimatedLength: estimatedLength,
          },
        });
        res.status(201).json(user);
      } else {
        res
          .status(400)
          .json({ success: false, message: "Project Id does not exist." });
      }
    } catch (err) {
      res
        .status(400)
        .json({ success: false, message: "Error on create task." });
    } finally {
      await prisma.$disconnect();
    }
  },
};
