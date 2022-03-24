const PORT: number = 8000;

const TYPES = {
  Application: Symbol.for('Application'),
  ILogger: Symbol.for('ILogger'),
  UserController: Symbol.for('UserController'),
  ExceptionFilter: Symbol.for('ExceptionFilter'),
};

export { PORT, TYPES };
