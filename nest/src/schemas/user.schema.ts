import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Session } from './session.schema';

export type UserDocument = HydratedDocument<User>;
export enum Role {
  User = 'user',
  Admin = 'admin',
}

@Schema({ versionKey: false })
export class User {
  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop()
  username: string;

  @Prop({
    type: [{ type: String, enum: Role }],
    default: [Role.User],
  })
  role: Role[];

  @Prop({
    default: [],
  })
  sessions: Session[];
}

export const UserSchema = SchemaFactory.createForClass(User);
