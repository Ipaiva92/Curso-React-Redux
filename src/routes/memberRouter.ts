import { Router } from "express";
import { authenticateJWT } from "../middleware";
import { memberController } from "../controllers"

const router = Router();

router.post("/Member/MemberInfos", authenticateJWT, async (req, res) => {
  memberController.addMemberInfo(req, res);
})

router.post("/Member/MemberProject", authenticateJWT, async (req, res) => {
  memberController.addMemberToProject(req, res);
})

export default router;