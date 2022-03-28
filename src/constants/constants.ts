const PORT = 8000;

const TYPES = {
  Application: Symbol.for('Application'),
  ILogger: Symbol.for('ILogger'),
  UserController: Symbol.for('UserController'),
  UserService: Symbol.for('UserService'),
  ExceptionFilter: Symbol.for('ExceptionFilter'),
};

export { PORT, TYPES };
