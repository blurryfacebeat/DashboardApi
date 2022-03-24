import { injectable } from 'inversify';
import { Logger } from 'tslog';
import { ILogger } from './logger.interface.js';
import 'reflect-metadata';

@injectable()
class LoggerService implements ILogger {
  public logger: Logger;

  constructor() {
    this.logger = new Logger({
      displayInstanceName: false,
      displayLoggerName: false,
      displayFilePath: 'hidden',
      displayFunctionName: false,
    });
  }

  log(...args: Array<unknown>) {
    this.logger.info(...args);
  }

  error(...args: Array<unknown>) {
    this.logger.error(...args);
  }

  warn(...args: Array<unknown>) {
    this.logger.warn(...args);
  }
}

export { LoggerService };
