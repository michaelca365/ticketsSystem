import { Router } from "express";
import { userLogin } from "../controllers/controller.auth";

const router = Router();

router.post('/login', userLogin);

export default router;