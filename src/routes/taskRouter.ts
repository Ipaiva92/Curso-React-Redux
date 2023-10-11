import { Router } from "express";
import { authenticateJWT } from "../middleware";
import { taskController } from "../controllers"

const router = Router();

router.post("/Task/CreateTask", authenticateJWT, (req, res) => {
  taskController.createTask(req, res)
});

export default router;