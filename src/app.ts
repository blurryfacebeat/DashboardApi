import express, { Express } from 'express';
import { PORT, TYPES } from './constants/constants.js';
import { Server } from 'http';
import { UserController } from './users/users.controller.js';
import { ILogger } from './logger/logger.interface.js';
import { inject, injectable } from 'inversify';
import { IExceptionFilter } from './errors/exception.filter.interface.js';
import bodyParser from 'body-parser';
import 'reflect-metadata';

@injectable()
class App {
  app: Express;
  server: Server;
  port: number;

  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.UserController) private userController: UserController,
    @inject(TYPES.ExceptionFilter) private exceptionFilter: IExceptionFilter
  ) {
    this.app = express();
    this.port = PORT;
    this.logger = logger;
    this.userController = userController;
    this.exceptionFilter = exceptionFilter;
  }

  useMiddleware(): void {
    // Добавляем глобально JSON парсер, который будет читать body
    this.app.use(bodyParser.json());
  }

  useRoutes(): void {
    this.app.use('/users', this.userController.router);
  }

  useExceptionFilters(): void {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }

  public async init(): Promise<void> {
    this.useMiddleware();
    this.useRoutes();
    this.useExceptionFilters();
    this.server = this.app.listen(this.port);
    this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
  }
}

export { App };
