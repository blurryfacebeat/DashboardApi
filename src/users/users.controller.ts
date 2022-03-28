import { BaseController } from '../common/base.controller.js';
import { NextFunction, Request, Response } from 'express';
import { HttpError } from '../errors/http-error.class.js';
import { inject, injectable } from 'inversify';
import { TYPES } from '../constants/constants.js';
import { ILogger } from '../logger/logger.interface.js';
import 'reflect-metadata';
import { IUserController } from './users.controller.interface.js';
import { UserLoginDto } from './dto/user-login.dto.js';
import { UserRegisterDto } from './dto/user-register.dto.js';
import { UserService } from './users.service.js';
import { ValidateMiddleware } from '../common/validate.middleware.js';

@injectable()
class UserController extends BaseController implements IUserController {
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.UserService) private userService: UserService
  ) {
    super(loggerService);
    this.bindRoutes([
      {
        path: '/register',
        method: 'post',
        func: this.register,
        middlewares: [new ValidateMiddleware(UserRegisterDto)],
      },
      {
        path: '/login',
        method: 'post',
        func: this.login,
      },
    ]);
  }

  login(
    req: Request<{}, {}, UserLoginDto>,
    res: Response,
    next: NextFunction
  ): void {
    console.log(req.body);
    next(new HttpError(401, 'Ошибка авторизации', 'login'));
  }

  async register(
    { body }: Request<{}, {}, UserRegisterDto>,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const result = await this.userService.createUser(body);

    if (!result) {
      return next(new HttpError(422, 'Такой пользователь уже существует'));
    }

    this.ok(res, { email: result.email, name: result.name });
  }
}

export { UserController };
