import { AnyZodObject, z } from "zod";
import { NextFunction, Request, Response } from "express";
const userCreateSchema = z.object({
  body: z
    .object({
      name: z
        .string({
          required_error: "Full name is required.",
        })
        .max(50)
        .min(5),
      password: z
        .string({
          required_error: "Password is required.",
        })
        .max(50)
        .min(5),
      confirmPassword: z.string({
        required_error: "Confirm Password is required.",
      }),
      email: z
        .string({
          required_error: "Email is required.",
        })
        .max(50)
        .email("Not a valid email."),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: "custom",
          message: "The passwords did not match.",
        });
      }
    }),
});

const userLoginSchema = z.object(
  {
    body:z.object({
      email: z.string({
        required_error: "Email is required.",
      }).email("Not a valid email.")
    })
  }
)

const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (err) {
      return res.status(400).json(err);
    }
  };

export { userCreateSchema,userLoginSchema ,validate };
