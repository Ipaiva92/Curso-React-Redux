// import { clientController } from "../controllers";
import { Router } from "express";
import {authenticateJWT, validate} from "../middleware";
import { clientCreateSchema } from "../schemas";

const router = Router();

// router.post("/Client/CreateClient", validate(clientCreateSchema) ,authenticateJWT ,async (req, res) => {
//   clientController.createClient(req, res);
// });

export default router;
