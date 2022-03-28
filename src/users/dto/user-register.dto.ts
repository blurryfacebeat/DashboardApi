import { IsEmail, IsNotEmpty } from 'class-validator';

class UserRegisterDto {
  @IsNotEmpty({ message: 'Не указано имя' })
  name: string;

  @IsEmail({}, { message: 'Неверно указан email' })
  email: string;

  @IsNotEmpty({ message: 'Не указан пароль' })
  password: string;
}

export { UserRegisterDto };
