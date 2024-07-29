import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/common/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(email: string, password: string): Promise<User> {
    const createdUser = new this.userModel(email, password);
    return await createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<User> {
    const query = { email: email };
    return await this.userModel.findOne(query).exec();
  }

  async findByEmailAndUpdate(
    email: string,
    updateUserDto: User,
  ): Promise<User> {
    const query = { email: email };
    return await this.userModel.findOneAndUpdate(query, updateUserDto);
  }

  async updateSession(
    email: string,
    session: { access_token: string; expiresAt: number },
  ): Promise<any> {
    return this.userModel
      .findOneAndUpdate(
        { email },
        { $push: { sessions: session } },
        { new: true },
      )
      .exec();
  }
  async findByUserName(username: string): Promise<User> {
    const query = { username: username };
    return await this.userModel.findOne(query).exec();
  }

  async update(id: string, updateUserDto: User): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, updateUserDto, {
      new: true,
    });
  }

  async delete(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id);
  }
}
