import { Request, Response, NextFunction } from "express";
import { ValidationError } from "sequelize";

class HttpException extends Error {
  status: number;
  message: string;
  isBoom: boolean;
  output: {
    statusCode: number;
    payload: { statusCode: number; error: string; message: string };
  };
  constructor(
    status: number,
    message: string,
    isBoom: boolean,
    output: {
      statusCode: number;
      payload: { statusCode: number; error: string; message: string };
    }
  ) {
    super(message);
    this.status = status;
    this.message = message;
    this.isBoom = isBoom;
    this.output = output;
  }
}

export const logErrors = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  console.error(error, "Error Log");
  next(error);
};

export const errorHandler = (
  error: HttpException,
  req: Request,
  res: Response,
): Response | void => {
  res.status(500).json({ msg: error.message, type: "internal server error" });
};

export const boomErrorHandler = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  if (error.isBoom) {
    console.log(error);
    const { output } = error;
    return res.status(output.statusCode).json(output.payload);
  }
  next(error);
};

export const ormErrorHandler = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  if (error instanceof ValidationError) {
    return res.status(409).json({
      statusCode: 409,
      message: error.message,
      errors: error.errors,
    });
  }
  next(error);
};
