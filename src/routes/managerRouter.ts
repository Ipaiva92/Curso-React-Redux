import { Router } from "express";
import { authenticateJWT, checkPermission, validate } from "../middleware";
import { managerController } from "../controllers";
import { projectCreateSchema } from "../schemas";

const router = Router();

router.post(
  "/Manager/CreateProject",
  validate(projectCreateSchema),
  authenticateJWT,
  checkPermission,
  async (req, res) => {
    managerController.createProject(req, res);
  }
);

router.post(
  "/Manager/CreateManager",
  authenticateJWT,
  checkPermission,
  async (req, res) => {
    managerController.createManager(req, res);
  }
);

router.get(
  "/Manager/GetAllProjects",
  authenticateJWT,
  checkPermission,
  async (req, res) => {
    managerController.getAllProjects(req, res);
  }
);

router.get("/Manager/GetProjectDetails", async (req, res) => {
  managerController.getProjectDetails(req, res);
})

export default router;
