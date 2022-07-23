import { Router } from "express";
import { userLogin } from "../controllers/controller.auth";
import { validatorHandler } from "../middlewares/validatorHandler";
import { authenticationSchema } from "../schemas/schema.auth"
const router = Router();

router.post('/login',[validatorHandler(authenticationSchema, "body")], userLogin);

export default router;