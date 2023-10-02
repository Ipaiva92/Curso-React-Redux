import { prisma } from "../prismaClient";
import { Request, Response } from "express";

export default {
  create: async (req: Request, res: Response) => {
    const { title, content, authorEmail, password } = req.body ?? {};
    const post = await prisma.post.create({
      data: {
        title,
        content,
        published: false,
        author: { create: { email: authorEmail , password: password} },
      },
    });
    res.json(post);
  },
};
