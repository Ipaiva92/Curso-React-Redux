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
      const existMember = await prisma.member.findMany({where: {
        userId: userId
      }, select: { userId: true}})
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
        res.json({ success: false, message: "Failed to find user." });
      }
    } catch (err) {
      res.json({ error: err, message: "Failed to add info on member." });
    }
  },
};
