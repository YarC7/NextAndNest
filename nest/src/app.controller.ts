import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
// import { Public } from './auth/decorators/public.decorators';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('cookies')
  getCookies(@Req() req: Request): any {
    return req.cookies;
  }
}
