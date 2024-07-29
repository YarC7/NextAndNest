import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from 'src/common/schemas/book.schema';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { BookDto } from 'src/common/dto/book.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/schemas/user.schema';
import { RolesGuard } from 'src/common/guard/role.guard';

@UseGuards(RolesGuard)
@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Get()
  @Roles(Role.Admin)
  async getAllBooks(@Query() query: ExpressQuery): Promise<Book[]> {
    return await this.bookService.findAll(query);
  }

  @Post()
  async createBook(
    @Body()
    book: BookDto,
  ): Promise<Book> {
    return this.bookService.create(book);
  }

  // @Get(':id')
  // async getBook(
  //   @Param('id')
  //   id: string,
  // ): Promise<Book> {
  //   return this.bookService.findById(id);
  // }

  @Put(':id')
  async updateBook(
    @Param('id')
    id: string,
    @Body()
    book: BookDto,
  ): Promise<Book> {
    return this.bookService.update(id, book);
  }

  @Delete(':id')
  async deleteBook(
    @Param('id')
    id: string,
  ): Promise<Book> {
    return this.bookService.delete(id);
  }
}
