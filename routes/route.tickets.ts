import { Router } from "express";
const router = Router();
import { vertificarJWT } from "../middlewares/generarJWT";
import { permissionValidation } from "../middlewares/validateData";
import { validatorHandler } from "../middlewares/validatorHandler";
import { endTicketSchema, filterTiqueteSchema, generateTicketSchema, updateTicketSchema } from "../schemas/schema.tickets";
import { endTicketController, generateTicketController, getTicketsController, getUserTicketsController, updateTicketController } from "../controllers/controller.tickets";

router.post(
  "/generateTicket",
  [vertificarJWT, permissionValidation([1, 2]), validatorHandler(generateTicketSchema, "body")],
  generateTicketController
);
router.get(
  "/listarTiquetes",
  [vertificarJWT, permissionValidation([1, 2]), validatorHandler(filterTiqueteSchema, "query")],
  getTicketsController
);

router.put("/editarTiquete", [vertificarJWT, validatorHandler(updateTicketSchema, "body")], updateTicketController);

router.get("/listarTiquetesUsuario", [vertificarJWT, permissionValidation([3])], getUserTicketsController);

router.put("/finalizarTiquete", [vertificarJWT, permissionValidation([3]), validatorHandler(endTicketSchema, "body")], endTicketController)

export default router;
