import { NextFunction, Request, Response, Router } from 'express';
import { IMiddleware } from './middleware.interface.js';

interface IControllerRoute {
  path: string;
  func: (req: Request, res: Response, next: NextFunction) => void;
  method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>;
  middlewares?: Array<IMiddleware>;
}

export { IControllerRoute };
