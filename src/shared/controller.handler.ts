import { Response } from "express";

export class ControllerResponseHandler {
  constructor() {}

  private send(
    res: Response,
    statusCode: number,
    message: string,
    details?: unknown,
  ): void {
    res.status(statusCode).json({
      error: message,
      ...(details ? { details: details } : {}),
    });
  }

  successResponse(res: Response, message = "Success", details?: unknown): void {
    this.send(res, 200, message, details);
  }

  badRequest(res: Response, message = "Bad Request", details?: unknown): void {
    this.send(res, 400, message, details);
  }

  notFound(res: Response, message = "Not Found", details?: unknown): void {
    this.send(res, 404, message, details);
  }

  failedFetchError(
    res: Response,
    message = "Failed to fetch upstream data",
    details?: unknown,
  ): void {
    this.send(res, 502, message, details);
  }

  internalServerError(
    res: Response,
    message = "Internal Server Error",
    details?: unknown,
  ): void {
    this.send(res, 500, message, details);
  }
}

let responseHandler = new ControllerResponseHandler();

export default responseHandler;

