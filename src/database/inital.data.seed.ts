import { Item } from 'src/items/entities/item.entity';
import { Purchase } from 'src/purchases/entities/purchase.entity';
import { User } from 'src/users/entities/user.entity';
import { Connection } from 'typeorm';

export class InitialDataSeed {
  public async run(connection: Connection): Promise<void> {
    const userRepository = connection.getRepository(User);
    const itemRepository = connection.getRepository(Item);
    const purchaseRepository = connection.getRepository(Purchase);

    // Создание пользователей
    const users = [
      { name: 'Alice', balance: 100.00 },
      { name: 'Bob', balance: 50.00 },
    ];

    for (const userData of users) {
      const user = userRepository.create(userData);
      await userRepository.save(user);
    }

    // Создание предметов
    const items = [
      { name: 'Item 1', price: 20.00 },
      { name: 'Item 2', price: 30.00 },
    ];

    for (const itemData of items) {
      const item = itemRepository.create(itemData);
      await itemRepository.save(item);
    }

    // Создание покупок
    const purchases = [
      { user: await userRepository.findOne({ where: { name: 'Alice' } }), item: await itemRepository.findOne({ where: { name: 'Item 1' } }), purchaseDate: new Date() },
      { user: await userRepository.findOne({ where: { name: 'Bob' } }), item: await itemRepository.findOne({ where: { name: 'Item 2' } }), purchaseDate: new Date() },
    ];

    for (const purchaseData of purchases) {
      const purchase = purchaseRepository.create(purchaseData);
      await purchaseRepository.save(purchase);
    }
  }
}