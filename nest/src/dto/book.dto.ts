import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Category, Format } from 'src/schemas/book.schema';

export class BookDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  readonly price: string;

  readonly image: string;

  @IsNotEmpty()
  @IsString()
  readonly author: string;

  @IsNotEmpty()
  @IsEnum(Format, { message: 'Please enter correct format' })
  readonly format: Format;

  @IsNotEmpty()
  @IsEnum(Category, { message: 'Please enter correct category' })
  readonly category: Category;
}
