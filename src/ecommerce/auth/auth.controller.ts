import {
  Controller,
  Post,
  Body,
  Delete,
  HttpCode,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserLogin } from './dto/user-login.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('user')
  @HttpCode(201)
  async create(@Body() createUser) {
    return await this.authService.create(createUser);
  }

  @Delete('user')
  delete(@Body() user: any) {
    return this.authService.delete(user?.usuario_id);
  }

  @Post('user/login')
  login(@Body() user: any) {
    return this.authService.login(user);
  }
}
