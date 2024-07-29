import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { Session, SessionSchema } from 'src/common/schemas/session.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }]),
  ],
  providers: [SessionsService],
  exports: [SessionsService],
})
export class SessionsModule {}
