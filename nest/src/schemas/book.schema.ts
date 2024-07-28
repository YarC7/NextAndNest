import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
export type BookDocument = HydratedDocument<Book>;

export enum Category {
  ADVENTURE = 'Adventure',
  ROMANCE = 'Romance',
  CRIME = 'Crime',
  FANTASY = 'Fantasy',
}

export enum Format {
  PDF = 'pdf',
  PAPERBACK = 'packerback',
  HANDCOVER = 'handcover',
}
@Schema({ versionKey: false, timestamps: true })
export class Book {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  author: string;

  @Prop()
  format: Format;

  @Prop()
  price: string;

  @Prop()
  image: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);
