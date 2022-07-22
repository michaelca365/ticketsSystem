import boom from "@hapi/boom";
import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";

export const validatorHandler = (schema: Schema, property: string) => {
  return (req: Request, res: Response, next: NextFunction): Response | void => {
      const data = req[property as never];
      const { error } = schema.validate(data, {abortEarly: false});
      if(error) return next(boom.badRequest(error.message));
      next();
  };
};