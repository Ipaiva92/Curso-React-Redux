import { postController } from "../controllers";
import { Router } from "express";

const router = Router();

router.post("/post", async (req, res) => {
  postController.create(req, res);
});

export default router;
