import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import auth from "../routes/route.auth";
import users from "../routes/route.users";
import tickets from "../routes/route.tickets";
import { sequelize } from "../database/config";
import { setupModels } from "../database/model";

import {
  boomErrorHandler,
  errorHandler,
  logErrors,
  ormErrorHandler
} from "../middlewares/errorHandler";

export class Server {
  port: string | number;
  app: express.Application;
  paths: { [index: string]: string };
  constructor() {
    this.port = process.env.PORT || 3000;
    this.app = express();
    this.paths = {
      auth: "/api/v1/auth",
      users: "/api/v1/users",
      tickets: "/api/v1/tickets"
    };
    this.middlewares();
    this.routes();
    this.conectarDB();
    this.error();
  }

  middlewares(): void {
    this.app.use(cors({ origin: true, credentials: true }));
    this.app.use(cookieParser());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes(): void {
    this.app.use(this.paths.auth, auth);
    this.app.use(this.paths.users, users);
    this.app.use(this.paths.tickets, tickets);
  }

  async conectarDB(): Promise<void> {
    try {
      await sequelize.authenticate();
      setupModels(sequelize);
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }

  error(): void {
    this.app.use(logErrors);
    this.app.use(ormErrorHandler);
    this.app.use(boomErrorHandler);
    this.app.use(errorHandler);
  }

  listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Servidor escuchando en http://localhost:${this.port}`);
    });
  }
}
