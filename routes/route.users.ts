import {Router} from "express"
import { createUserController, disableUserController, getUsersController } from "../controllers/controller.users";
import { validatorHandler } from "../middlewares/validatorHandler";
import { createUser, disableUserSchema } from "../schemas/schema.users";
import { vertificarJWT } from "../middlewares/generarJWT"
import { permissionValidation } from "../middlewares/validateData"
const router = Router();

router.post("/create", [vertificarJWT, permissionValidation([1]),  validatorHandler(createUser, "body")], createUserController);
router.get("/listarUsuarios", [vertificarJWT,permissionValidation([1,3])], getUsersController);
router.put("/deshabilitarUsuario/:userId", [vertificarJWT, permissionValidation([1]), validatorHandler(disableUserSchema, "params")], disableUserController);

export default router;