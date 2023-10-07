import { Role } from "@prisma/client";
import { prisma } from "../prismaClient";
import { Request, Response } from "express";

export default {
  changePermission: async (req: Request, res: Response) => {
    const { userId, type } = req.body ?? {};
    const findUser = await prisma.user.findUnique({where: { id : userId}})
    if (findUser?.type == Role.Manager) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          type: type,
        },
      });
      res.json({ success: true, message: `Change Permission successfully.` });
    } else {
      res.json({
        success: false,
        message: "This user does not have permission to change permission.",
      });
    }
  },
};
