import { NextFunction, Request, Response } from 'express';
import { IExceptionFilter } from './exception.filter.interface.js';
import { HttpError } from './http-error.class.js';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface.js';
import { TYPES } from '../constants/constants.js';
import 'reflect-metadata';

@injectable()
class ExceptionFilter implements IExceptionFilter {
  constructor(@inject(TYPES.ILogger) private logger: ILogger) {}

  catch(
    err: Error | HttpError,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    if (err instanceof HttpError) {
      this.logger.error(
        `[${err.context}] Error ${err.statusCode}: ${err.message}`
      );
      res.status(err.statusCode).send({ err: err.message });
    } else {
      this.logger.error(err.message);
      res.status(500).send({ err: err.message });
    }
  }
}

export { ExceptionFilter };
