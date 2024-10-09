import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Item } from 'src/items/entities/item.entity';

@Entity('purchases')
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.purchases)
  user: User;

  @ManyToOne(() => Item, item => item.purchases)
  item: Item;

  @Column('timestamp')
  purchaseDate: Date;
}