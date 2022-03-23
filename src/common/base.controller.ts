import { LoggerService } from '../logger/logger.service.js';
import { Response, Router } from 'express';
import { IControllerRoute } from './route.interface.js';

abstract class BaseController {
  private readonly _router: Router;

  constructor(private logger: LoggerService) {
    this._router = Router();
  }

  get router() {
    return this._router;
  }

  public send<T>(res: Response, code: number, message: T) {
    res.type('application/json');
    return res.status(code).json(message);
  }

  public ok<T>(res: Response, message: T) {
    return this.send<T>(res, 200, message);
  }

  public created(res: Response) {
    return res.sendStatus(201);
  }

  protected bindRoutes(routes: Array<IControllerRoute>) {
    routes.forEach(({ path, func, method }) => {
      this.logger.log(`[${method}] ${path}`);
      // Делаем для сохранения контекста
      const handler = func.bind(this);
      this._router[method](path, handler);
    });
  }
}

export { BaseController };
