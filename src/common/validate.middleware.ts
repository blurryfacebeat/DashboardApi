import { Request, Response, NextFunction } from 'express';
import { IMiddleware } from './middleware.interface.js';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

class ValidateMiddleware implements IMiddleware {
  constructor(private classToValidate: ClassConstructor<object>) {}

  execute({ body }: Request, res: Response, next: NextFunction): void {
    const instance = plainToClass(this.classToValidate, body);
    validate(instance).then((errors) => {
      errors.length > 0
        ? res.status(422).send(this.formatErrors(errors))
        : next();
    });
  }

  private formatErrors(errors: Array<ValidationError>): Array<string> {
    const result: Array<string> = [];
    errors.forEach((error) => {
      result.push(
        Object.values(
          error.constraints as Record<string, string>
        )?.[0] as string
      );
    });
    return result;
  }
}

export { ValidateMiddleware };
