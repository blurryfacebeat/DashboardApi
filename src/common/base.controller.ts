import { Response, Router } from 'express';
import { IControllerRoute } from './route.interface.js';
import { ILogger } from '../logger/logger.interface.js';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
abstract class BaseController {
  private readonly _router: Router;

  constructor(private logger: ILogger) {
    this._router = Router();
  }

  get router(): Router {
    return this._router;
  }

  public send<T>(res: Response, code: number, message: T): Response {
    res.type('application/json');
    return res.status(code).json(message);
  }

  public ok<T>(res: Response, message: T): Response {
    return this.send<T>(res, 200, message);
  }

  public created(res: Response): Response {
    return res.sendStatus(201);
  }

  protected bindRoutes(routes: Array<IControllerRoute>): void {
    routes.forEach(({ path, func, method }) => {
      this.logger.log(`[${method}] ${path}`);
      // Делаем для сохранения контекста
      const handler = func.bind(this);
      this._router[method](path, handler);
    });
  }
}

export { BaseController };
