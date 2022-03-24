import { Request, Response, NextFunction } from 'express';

interface IUserController {
  login: (req: Request, res: Response, next: NextFunction) => void;
  register: (req: Request, res: Response, next: NextFunction) => void;
}

export { IUserController };
