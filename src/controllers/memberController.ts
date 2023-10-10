import { prisma } from "../prismaClient";
import { Request, Response } from "express";

export default {
  addMemberInfo: async (req: Request, res: Response) => {
    try {
      const { userId, hourlyRate, memberRole } = req.body ?? {};
      const findUser = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true },
      });
      const existMember = await prisma.member.findMany({
        where: {
          userId: userId,
        },
        select: { userId: true },
      });
      if (findUser && !existMember) {
        await prisma.member.create({
          data: {
            userId: findUser?.id,
            hourlyRate: hourlyRate,
            memberRole: memberRole,
          },
        });
        res.json({ success: true, message: "Member created successfully." });
      } else {
        res
          .status(400)
          .json({ success: false, message: "Failed to find user or create." });
      }
    } catch (err) {
      res
        .status(400)
        .json({ error: err, message: "Failed to add info on member." });
    }
  },
  addMemberToProject: async (req: Request, res: Response) => {
    try {
      const { projectId, memberId } = req.body ?? {};
      const findMember = await prisma.member.findUnique({
        where: { id: memberId },
        select: { id: true },
      });
      const findProject = await prisma.project.findUnique({
        where: { id: projectId },
        select: { id: true },
      });

      const memberExist = await prisma.member_Project.findMany({
        where: { AND: [{ memberId: memberId }, { projectId: projectId }] },
      });
      if (!memberExist.length) {
        if (findMember && findProject) {
          await prisma.member_Project.create({
            data: {
              projectId: findProject?.id,
              memberId: findMember?.id,
            },
          });
          res.status(200).json({
            success: true,
            message: "Successfully added member to project.",
          });
        } else {
          res
            .status(400)
            .json({ success: false, message: "Invalid projectId or UserId." });
        }
      } else {
        res
          .status(400)
          .json({
            success: false,
            message: "User already participated to this project.",
          });
      }
    } catch (err) {
      res
        .status(400)
        .json({ error: err, message: "Error adding member to project." });
    }
  },
};
