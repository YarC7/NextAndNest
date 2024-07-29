import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session } from 'src/common/schemas/session.schema';

@Injectable()
export class SessionsService {
  constructor(
    @InjectModel(Session.name) private sessionModel: Model<Session>,
  ) {}
  async create(createSessionDto: Session): Promise<Session> {
    const createdSession = new this.sessionModel(createSessionDto);
    return await createdSession.save();
  }
  async update(token: string, newExpiresAt: number): Promise<any> {
    const existingSession = await this.sessionModel.findOneAndUpdate(
      { token: token },
      { expiresAt: newExpiresAt },
      { new: true }, // Trả về session đã được cập nhật
    );
    return existingSession;
  }
}
