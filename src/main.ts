import { App } from './app.js';
import { LoggerService } from './logger/logger.service.js';
import { UserController } from './users/users.controller.js';
import { ExceptionFilter } from './errors/exception.filter.js';
import { Container, ContainerModule, interfaces } from 'inversify';
import { ILogger } from './logger/logger.interface.js';
import { TYPES } from './constants/constants.js';
import { IExceptionFilter } from './errors/exception.filter.interface.js';

export const appBinging = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.ILogger).to(LoggerService);
  bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
  bind<UserController>(TYPES.UserController).to(UserController);
  bind<App>(TYPES.Application).to(App);
});

const bootstrap = () => {
  const appContainer = new Container();
  appContainer.load(appBinging);
  const app = appContainer.get<App>(TYPES.Application);
  app.init();

  return { appContainer, app };
};

export const { app, appContainer } = bootstrap();
