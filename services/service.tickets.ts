import { Model, WhereOptions } from "sequelize/types";
import { sequelize } from "../database/config";
import { createTicket, filterTickets, updateEndTicket, updateTicket } from "../interface/interface.tickets";
import { randomUser } from "../helpers/randomicUser";
import boom from "@hapi/boom";

export class TicketsService {
  private async findValidUser(id: string, notFoundMessage: string): Promise<Model> {
    try {
      const user = await sequelize.models.users.findOne({ where: { id, estado: true } });
      if (!user) {
        throw boom.badRequest(notFoundMessage);
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  private async findAllTechnician(): Promise<{ id: string }[]> {
    try {
      const users = (await sequelize.models.users.findAll({ attributes: ["id"], where: { user_permission: 3 }, raw: true })) as unknown as {
        id: string;
      }[];
      if (users.length === 0) {
        throw boom.badRequest("No tecnicos registrados en el sistema");
      }
      return users;
    } catch (error) {
      throw error;
    }
  }

  private async generateTicketNumber(): Promise<number> {
    try {
      const lastTicketNumber = await sequelize.models.tickets.findAll({ attributes: ["id"], order: [["id", "DESC"]], limit: 1 });
      if (lastTicketNumber.length === 0) {
        return 10000;
      }
      return parseInt(lastTicketNumber[0].get("id") as string) + 1;
    } catch (error) {
      throw error;
    }
  }

  private async findActiveTicket(where: WhereOptions): Promise<Model> {
    try {
      const ticket = await sequelize.models.tickets.findOne({ where });
      if (!ticket) {
        throw boom.badRequest("No se encontro el tiquete a editar");
      }
      return ticket;
    } catch (error) {
      throw error;
    }
  }

  async findAllTickets(data: filterTickets): Promise<Model[]> {
    try {
      let options: WhereOptions = {};
      const offset = data.from ? parseInt(data.from) : undefined;
      const limit = data.to ? parseInt(data.to) : undefined;
      data.technician_id ? (options = { ...options, technician_id: data.technician_id }) : null;
      data.creatorId ? (options = { ...options, generated_by: data.creatorId }) : null;
      data.ticket_id ? (options = { ...options, id: data.ticket_id }) : null;
      const tickets = await sequelize.models.tickets.findAll({
        include: [
          { association: "tecnico", attributes: ["user_name", "email"], where: { estado: true } },
          { association: "usuario_creador", attributes: ["user_name", "email"], where: { estado: true } },
        ],
        where: options,
        offset,
        limit,
      });
      return tickets;
    } catch (error) {
      throw error;
    }
  }

  async findUserTickets(userId: string): Promise<Model[]> {
    try {
      const tickets = await sequelize.models.tickets.findAll({
        include: [{ association: "usuario_creador", attributes: ["user_name", "email"], where: { estado: true } }],
        where: { technician_id: userId },
      });
      return tickets;
    } catch (error) {
      throw error;
    }
  }

  async createTicket(data: createTicket, uid: string): Promise<Model> {
    try {
      let technician_id = "";
      if (data.technician_id) {
        await this.findValidUser(data.technician_id, "El tecnico asignado no se encuentra");
        technician_id = data.technician_id;
      } else {
        const usersId = await this.findAllTechnician();
        technician_id = randomUser(usersId).id;
      }
      const ticketNumber = await this.generateTicketNumber();
      const createdTicket = await sequelize.models.tickets.create({ ...data, id: ticketNumber, generated_by: uid, technician_id });
      return createdTicket;
    } catch (error) {
      throw error;
    }
  }

  async updateTicket(data: updateTicket): Promise<Model> {
    try {
      const ticket = await this.findActiveTicket({ id: data.id, state: true });
      const updatedTicket = ticket.update(data);
      return updatedTicket;
    } catch (error) {
      throw error;
    }
  }

  async updateEndTicket(data: updateEndTicket, uid: string): Promise<Model>{
    try {
        const ticket = await this.findActiveTicket({id: data.ticket_id, state: true, technician_id: uid});
        const updatedTicket = ticket.update({...data, date_fixed: new Date()});
        return updatedTicket;
    } catch (error) {
        throw error;
    }
  }
}
