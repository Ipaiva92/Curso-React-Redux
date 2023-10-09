import { userController } from "../controllers";
import { Router } from "express";
import { userCreateSchema, userLoginSchema } from "../schemas";
import { validate } from "../middleware";

const router = Router();

router.post(
  "/User/CreateUser",
  validate(userCreateSchema),
  async (req, res) => {
    userController.createUser(req, res);
  }
);

router.post("/User/Login", validate(userLoginSchema), async (req, res) => {
  userController.login(req, res);
});

export default router;
