import { BaseController } from '../common/base.controller.js';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../errors/http-error.class.js';
import { inject, injectable } from 'inversify';
import { TYPES } from '../constants/constants.js';
import { ILogger } from '../logger/logger.interface.js';
import 'reflect-metadata';
import { IUserController } from './users.controller.interface.js';

@injectable()
class UserController extends BaseController implements IUserController {
  constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
    super(loggerService);
    this.bindRoutes([
      {
        path: '/register',
        method: 'post',
        func: this.register,
      },
      {
        path: '/login',
        method: 'post',
        func: this.login,
      },
    ]);
  }

  login(req: Request, res: Response, next: NextFunction) {
    next(new HttpError(401, 'Ошибка авторизации', 'login'));
  }

  register(req: Request, res: Response, next: NextFunction) {
    this.ok(res, 'register');
  }
}

export { UserController };
