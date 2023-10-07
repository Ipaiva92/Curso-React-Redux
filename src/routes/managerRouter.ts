import { Router } from "express";
import { authenticateJWT, validate } from "../middleware";
import { managerController } from "../controllers";
import { projectCreateSchema } from "../schemas";

const router = Router();

router.post(
  "/Manager/CreateProject",
  validate(projectCreateSchema),
  authenticateJWT,
  async (req, res) => {
    managerController.createProject(req, res);
  }
);

router.post("/Manager/CreateManager", authenticateJWT, async (req, res) => {
  managerController.createManager(req, res);
});

export default router;
