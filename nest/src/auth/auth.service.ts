import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { addMilliseconds } from 'date-fns';
import { SignUpDto, LoginDto } from 'src/dto/user.dto';
import { User } from 'src/schemas/user.schema';
import { SessionsService } from 'src/sessions/sessions.service';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityError } from 'src/utils/errors';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private sessionService: SessionsService,
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}
  async signIn(LoginDto: LoginDto) {
    const user = await this.usersService.findByEmail(LoginDto.email);
    if (!user) {
      throw new Error();
    }
    const payload = {
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role,
    };

    const access_token = await this.jwtService.signAsync(payload);

    const isPasswordMatch = await bcrypt.compare(
      LoginDto.password,
      user.password,
    );
    if (!isPasswordMatch) {
      throw new EntityError([
        { field: 'password', message: 'Email hoặc mật khẩu không đúng' },
      ]);
    }

    // const session = await this.createSession(access_token, user);
    let session;
    try {
      session = await this.createSession(access_token, LoginDto.email);
    } catch (error) {
      throw error; // Rethrow other errors
    }
    return { access_token, session };
  }

  async createSession(sessionToken: string, email: string) {
    const expiresAt =
      addMilliseconds(new Date(), 20 * 60 * 1000).getTime() / 1000; // 20 minutes
    // const expiresAtTimestamp = expiresAt.getTime();  // convert to timestamp
    const session = await this.sessionService.create({
      token: sessionToken,
      expiresAt: expiresAt,
    });

    await this.usersService.updateSession(email, {
      access_token: sessionToken,
      expiresAt: expiresAt,
    });
    // console.log(updateSession);
    return session;
  }

  async updateToken(sessionToken: string) {
    const expiresAt =
      addMilliseconds(new Date(), 20 * 60 * 1000).getTime() / 1000;
    const session = await this.sessionService.update(sessionToken, expiresAt);
    return session;
  }

  async getAllUsers() {
    return await this.usersService.findAll();
  }

  async signUp(signUpDto: SignUpDto) {
    const { username, email, password, role } = signUpDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const user = await this.userModel.create({
        username,
        email,
        password: hashedPassword,
        role,
      });

      const access_token = await this.jwtService.signAsync(user);
      const session = await this.createSession(access_token, signUpDto.email);
      return { access_token, session };
    } catch (error) {
      if (error?.code === 11000) {
        throw new ConflictException('Duplicate Email Entered');
      }
    }
  }
}
