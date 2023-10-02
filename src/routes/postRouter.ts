import { postController } from "../controllers";
import { Router } from "express";
import {authenticateJWT} from "../middleware";

const router = Router();

router.post("/post", authenticateJWT ,async (req, res) => {
  postController.create(req, res);
});

export default router;
