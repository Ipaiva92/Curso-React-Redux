import { Role } from "@prisma/client";
import { prisma } from "../prismaClient";
import { Request, Response } from "express";

export default {
  createProject: async (req: Request, res: Response) => {
    const { name, userId, managerEmail  } = req.body ?? {};
    const findUser = await prisma.user.findUnique({where: { id : userId}})
    if ( findUser?.type === Role.Manager ) {
      const client = await prisma.project.create({
        data: {
          name: name,
          manager: { connect: { id: managerEmail } }
        },
      });
      res.json(client);
    }
    else {
      res.json({success: false, message: "This user does not have permission to create a project."})
    }}

};
