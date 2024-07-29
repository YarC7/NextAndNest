import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../entity/users/users.module';
import { AuthController } from './auth.controller';
import { AuthGuard } from 'src/common/guard/auth.guard';
import { AuthService } from './auth.service';
import { jwtConstants } from '../common/constants/constants';
import { SessionsModule } from 'src/entity/sessions/sessions.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/common/schemas/user.schema';
import { ThrottlerGuard } from '@nestjs/throttler';

@Module({
  imports: [
    SessionsModule,
    UsersModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
