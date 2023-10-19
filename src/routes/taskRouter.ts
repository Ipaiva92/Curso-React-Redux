import { Router } from "express";
import { authenticateJWT } from "../middleware";
import { taskController } from "../controllers";

const router = Router();

router.post("/Task/CreateTask", authenticateJWT, (req, res) => {
  taskController.createTask(req, res);
});

router.post("/Task/AssociateTask", authenticateJWT, (req, res) => {
  taskController.associateTask(req, res);
});

router.get("/Task/GetAllTasks", authenticateJWT, (req, res) => {
  taskController.getAllTasks(req, res);
});

export default router;
