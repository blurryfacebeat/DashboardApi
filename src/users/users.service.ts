import { IUserService } from './users.service.interface.js';
import { UserRegisterDto } from './dto/user-register.dto.js';
import { User } from './user.entity.js';
import { UserLoginDto } from './dto/user-login.dto.js';
import { injectable } from 'inversify';

@injectable()
class UserService implements IUserService {
  async createUser(dto: UserRegisterDto): Promise<User | null> {
    const { email, name, password } = dto;
    const newUser = new User(email, name);
    await newUser.setPassword(password);
    return null;
  }

  async validateUser(dto: UserLoginDto): Promise<boolean> {
    return true;
  }
}

export { UserService };
