import * as express from "express";
declare global {
  namespace Express {
    export interface Request {
      usuario: {
        userName: string;
        email: string;
        estado: boolean;
        seguridad: number;
        uid: string;
      };
    }
  }
}
