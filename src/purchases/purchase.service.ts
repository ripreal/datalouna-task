import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { Item } from 'src/items/entities/item.entity';
import { Purchase } from './entities/purchase.entity';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
  ) {}

  async buyItem(userId: number, itemId: number): Promise<Purchase> {
    const user = await this.userRepository.findOne({where: {id: userId}, relations: ['purchases']});
    const item = await this.itemRepository.findOne({where: {id: itemId}});

    if (!user || !item) {
      throw new Error('User or Item not found');
    }

    if (+user.balance < +item.price) {
      throw new Error('Insufficient balance');
    }

    user.balance -= item.price;
    await this.userRepository.save(user);

    const purchase = new Purchase();
    purchase.user = user;
    purchase.item = item;
    purchase.purchaseDate = new Date();

    return this.purchaseRepository.save(purchase);
  }
}