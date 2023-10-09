import { Router } from "express";
import { authenticateJWT, checkPermission } from "../middleware";
import { permissionController } from "../controllers";

const router = Router();

router.put(
  "/Permission/ChangePermission",
  authenticateJWT,
  checkPermission,
  async (req, res) => {
    permissionController.changePermission(req, res);
  }
);

export default router;