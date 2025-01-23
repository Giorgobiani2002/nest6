import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import * as exp from 'constants';

@Injectable()
export class ExpensesService {
  private expense = [
    {
      id: 1,
      firstName: 'lasha',
      lastName: 'Giorgobiani',
      email: 'test123@gmail.com',
      phoneNumber: '+995229392',
      gender: 'male',
    },
    {
      id: 2,
      firstName: 'lasha',
      lastName: 'Giorgobiani',
      email: 'test123@gmail.com',
      phoneNumber: '+995229392',
      gender: 'male',
    },
    {
      id: 3,
      firstName: 'lasha',
      lastName: 'Giorgobiani',
      email: 'test123@gmail.com',
      phoneNumber: '+995229392',
      gender: 'male',
    },
    {
      id: 4,
      firstName: 'lasha',
      lastName: 'Giorgobiani',
      email: 'test123@gmail.com',
      phoneNumber: '+995229392',
      gender: 'male',
    },
  ];
  create(createExpenseDto: CreateExpenseDto) {
    const { firstName, lastName, email, phoneNumber, gender } =
      createExpenseDto;
    const lastID = this.expense[this.expense.length - 1]?.id || 0;
    const newExpenses = {
      id: lastID + 1,
      firstName,
      lastName,
      email,
      phoneNumber,
      gender,
    };
    this.expense.push(newExpenses);
    return newExpenses;
  }

  findAll() {
    return this.expense;
  }

  findOne(id: number) {
    const expense = this.expense.find((el) => el.id === id);
    if (!expense) throw new NotFoundException('post not found');
    return expense;
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    const index = this.expense.findIndex((el) => el.id === id);
    if (index === -1) throw new BadRequestException('you must add all field');
    const { firstName, lastName, email, phoneNumber, gender } =
      updateExpenseDto;
    const updateRequest: { content?: string; title?: string } = {};
    if (firstName) updateRequest.content = firstName;
    if (lastName) updateRequest.title = lastName;
    if (email) updateRequest.title = email;
    if (phoneNumber) updateRequest.title = phoneNumber;
    if (gender) updateRequest.title = gender;
    this.expense[index] = {
      ...this.expense[index],
      ...updateRequest,
    };
    return this.expense[index];
  }

  remove(id: number) {
    const index = this.expense.findIndex((el) => el.id === id);
    if (index === -1) throw new BadRequestException('expense couldnt deleted');
    const deletedExpense = this.expense.splice(index, 1);
    return deletedExpense;
  }
}
