import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SessionDocument = HydratedDocument<Session>;

@Schema({ timestamps: true, versionKey: false })
export class Session {
  @Prop()
  token: string;

  @Prop()
  expiresAt: number;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
