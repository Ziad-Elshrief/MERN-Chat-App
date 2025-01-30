import { NextFunction, Request, Response } from "express";

const errorHandler = (
  err: { message: string },
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    errorMessage: err.message,
  });
};

export { errorHandler };
