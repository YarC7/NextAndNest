import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from 'src/schemas/book.schema';
import { Query } from 'express-serve-static-core';
@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async create(BookDto: Book): Promise<Book> {
    const createdBook = new this.bookModel(BookDto);
    return await createdBook.save();
  }

  async findAll(query: Query): Promise<Book[]> {
    const resPerPage = 2;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const keyword = query.keyword
      ? {
          title: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};

    const books = await this.bookModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);
    return books;
  }

  async findOne(id: string): Promise<Book> {
    return await this.bookModel.findById(id).exec();
  }

  async findByAuthor(author: string): Promise<Book> {
    const query = { author: author };
    const book = await this.bookModel.findOne(query).exec();
    if (!book) {
      throw new NotFoundException('Book not found.');
    }
    return book;
  }

  async findByTitle(title: string): Promise<Book> {
    const query = { title: title };
    const book = await this.bookModel.findOne(query).exec();
    if (!book) {
      throw new NotFoundException('Book not found.');
    }
    return book;
  }

  async update(id: string, updateUserDto: Book): Promise<Book> {
    return await this.bookModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id: string): Promise<Book> {
    return await this.bookModel.findByIdAndDelete(id);
  }
}
