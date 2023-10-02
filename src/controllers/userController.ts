import jwt from "jsonwebtoken";
import { prisma } from "../prismaClient";
import { Request, Response } from "express";

var token = jwt.sign({ foo: "bar" }, "shhhhh");

export default {
  createUser: async (req: Request, res: Response) => {
    const { email, password, name, confirmPassword } = req.body ?? {};
    const user = await prisma.user.create({
      data: {
        email: email,
        password: password,
        name: name,
      },
    });
    res.json(user);
  },
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body ?? {};
    try{const login = await prisma.user.findUnique({ where: { email } });
    if (!login) {
      return res.json({ success: false, message: "User not found" });
    }

    res.json({jwt: token});

  } catch ( err ) {
    return { success: false, message: 'Incorrect password' };
  } finally {
    await prisma.$disconnect();
  }

  },
};
