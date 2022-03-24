interface ILogger {
  logger: unknown;
  log: (...args: Array<unknown>) => void;
  error: (...args: Array<unknown>) => void;
  warn: (...args: Array<unknown>) => void;
}

export { ILogger };
