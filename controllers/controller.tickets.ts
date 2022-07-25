import { Request, Response, NextFunction } from "express";
import { filterTickets } from "../interface/interface.tickets";
import { TicketsService } from "../services/service.tickets";

const service = new TicketsService();

export const generateTicketController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { uid } = req.usuario;
    const data = req.body;
    const ticketCreated = await service.createTicket(data, uid);
    res.status(201).send({ ticketCreated });
  } catch (error) {
    next(error);
  }
};

export const getTicketsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = req.query;
    const ticketCreated = await service.findAllTickets(data as filterTickets);
    res.status(201).send({ ticketCreated });
  } catch (error) {
    next(error);
  }
};

export const getUserTicketsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { uid } = req.usuario;
    const userTickets = await service.findUserTickets(uid);
    res.status(200).send({ userTickets });
  } catch (error) {
    next(error);
  }
};

export const endTicketController = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { uid } = req.usuario;
      const data = req.body;
      const updatedTicket = await service.updateEndTicket(data, uid);
      res.status(200).send({ updatedTicket });
    } catch (error) {
      next(error);
    }
  };
  

export const updateTicketController = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const ticketUpdated = await service.updateTicket(data);
      res.status(200).send({ ticketUpdated });
    } catch (error) {
      next(error);
    }
  };
  
