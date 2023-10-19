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
  associateTask: async (req: Request, res: Response) => {
    const { memberId, taskType, taskId, projectId } = req.body ?? {};
    try {
      const member = await prisma.member.findUnique({
        where: { id: memberId },
        select: {
          id: true,
        },
      });
      const project = await prisma.project.findUnique({
        where: { id: projectId },
        select: { id: true },
      });
      const task = await prisma.task.findUnique({
        where: { id: taskId },
        select: { id: true },
      });
      if (task && project && member) {
        const associateTask = await prisma.member_Task.create({
          data: {
            taskType: taskType,
            taskId: taskId,
            memberId: memberId,
            projectId: projectId,
          },
        });
        res.status(201).json(associateTask);
      } else {
        res.status(400).json({
          success: false,
          message: "Invalid project, member or task id.",
        });
      }
    } catch (err) {
      res
        .status(400)
        .json({ success: false, message: "Error to associate task." });
    } finally {
      await prisma.$disconnect();
    }
  },
  getAllTasks: async (req: Request, res: Response) => {
    try {
      const allTasks = await prisma.task.findMany({});
      res.status(200).json(allTasks);
    } catch (err) {
      res
        .status(400)
        .json({ success: false, message: "Error to get all tasks." });
    } finally {
      await prisma.$disconnect();
    }
  },
};
