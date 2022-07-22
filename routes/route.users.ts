import {Router} from "express"
import { createUserController } from "../controllers/controller.users";
import { validatorHandler } from "../middlewares/validatorHandler";
import { createUser } from "../schemas/schema.users";

const router = Router();

router.post("/create", [validatorHandler(createUser, "body")], createUserController);

export default router;