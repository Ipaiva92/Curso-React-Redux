import { prisma } from "../prismaClient";
import { Request, Response } from "express";

export default {
  createProject: async (req: Request, res: Response) => {
    const { name, userId } = req.body ?? {};
    try {
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
    } catch (err) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to create an Project." });
    } finally {
      await prisma.$disconnect();
    }
  },
  createManager: async (req: Request, res: Response) => {
    const { userId } = req.body ?? {};
    try {
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
        res
          .status(400)
          .json({ success: false, message: "Failed to create manager." });
      }
    } catch (err) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to create an Project." });
    } finally {
      await prisma.$disconnect();
    }
  },
  getAllProjects: async (req: Request, res: Response) => {
    try {
      const allProjects = await prisma.project.findMany({});
      res.status(200).json(allProjects);
    } catch (err) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to get all Projects." });
    } finally {
      await prisma.$disconnect();
    }
  },
  getProjectDetails: async (req: Request, res: Response) => {
    try {
      const projectId = req.query.projectId;

      if (!projectId) {
        res.status(404).json({ error: "Failed to find ProjectId." });
        return;
      }
      if (typeof projectId !== "string") {
        res.status(500).json({ error: "Invalid projectId." });
        return;
      }

      const project = await prisma.project.findUnique({
        where: { id: projectId },
      });
      res.status(200).json(project);
    } catch (err) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to get Project." });
    } finally {
      await prisma.$disconnect();
    }
  },
};
