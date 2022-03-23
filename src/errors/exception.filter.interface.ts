import { NextFunction, Request, Response } from 'express';

interface IExceptionFilter {
  catch: (err: Error, req: Request, res: Response, next: NextFunction) => void;
}

export { IExceptionFilter };
