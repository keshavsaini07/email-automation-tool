import { Router } from "express";
import { UserController } from "../../controllers/index.mjs";

const router = Router();

router.post('/create', UserController.createUser)

export default router;
