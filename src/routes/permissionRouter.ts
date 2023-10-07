import { Router } from "express";
import { authenticateJWT } from "../middleware";
import { permissionController } from "../controllers";

const router = Router();

router.put(
  "/Permission/ChangePermission",
  authenticateJWT,
  async (req, res) => {
    permissionController.changePermission(req, res);
  }
);

export default router;