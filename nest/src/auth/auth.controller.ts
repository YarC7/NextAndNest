import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorators';
import { Request } from 'express';
import { LoginDto, SignUpDto } from 'src/dto/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() LoginDto: LoginDto) {
    console.log(LoginDto);
    const result = await this.authService.signIn(LoginDto);
    // response.setCookie('Cookie', result.access_token, {
    //   httpOnly: true,
    //   secure: true,
    //   maxAge: 60 * 60 * 24 * 7,
    // });
    return result;
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('register')
  signUp(@Body() SignUpDto: SignUpDto) {
    return this.authService.signUp(SignUpDto);
  }

  @Get()
  findAll() {
    return this.authService.getAllUsers();
  }

  @Get('cookies')
  getCookies(@Req() req: Request): any {
    return req.cookies;
  }
}
