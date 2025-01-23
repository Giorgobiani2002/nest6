import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private expense = [
    {
      id: 1,
      category: 'shop',
      productName: 'jeans',
      quantity: 3,
      price: 500,
      
    },
    {
      id: 2,
      category: 'shop',
      productName: 'jeans',
      quantity: 3,
      price: 500,
      
    },
    {
      id: 3,
      category: 'shop',
      productName: 'jeans',
      quantity: 3,
      price: 500,
      
    },
    {
      id: 4,
      category: 'shop',
      productName: 'jeans',
      quantity: 3,
      price: 500,
      
    },
  ];
  create(createUserDto: CreateUserDto) {
    const { category, productName, quantity, price } =
      createUserDto;
    const lastID = this.expense[this.expense.length - 1]?.id || 0;
    const newExpenses = {
      id: lastID + 1,
      category,
      productName,
      quantity,
      price,
    };
    this.expense.push(newExpenses);
    return newExpenses;
  }

  findAll() {
    return this.expense;
  }

  findOne(id: number) {
    const existExpense = this.expense.find(el=>el.id===id)
    if(!existExpense){
      throw new BadGatewayException("wrong number")
    }
    return existExpense
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const index = this.expense.findIndex((el) => el.id === id);
    if (index === -1) throw new BadRequestException('you must add all field');
    const { category, productName, quantity, price } =
      updateUserDto;
    const updateRequest:any  = {};
    if (category) updateRequest.content = category;
    if (productName) updateRequest.title = productName;
    if (quantity) updateRequest.title = quantity;
    if (price) updateRequest.title = price;
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
