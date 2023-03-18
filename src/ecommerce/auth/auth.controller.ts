import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUser } from './dto/create-auth.dto';
import { UserLogin } from './dto/user-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('user')
  async create(@Body() createUser) {
    return await this.authService.create(createUser);
  }

  @Delete('user')
  delete(@Body() user: any) {
    return this.authService.delete(user?.usuario_id);
  }

  @Post('user/login')
  login(@Body() user: UserLogin) {
    return this.authService.login(user);
  }

}
