import { Module } from '@nestjs/common';
import { SkinnportModule } from 'src/skinnport/skinnport.module';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from './entities/purchase.entity';
import { Item } from 'src/items/entities/item.entity';
import { User } from 'src/users/entities/user.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      Purchase,
      Item,
      User,
    ]),
    SkinnportModule,
    UsersModule,
    PurchasesModule,
  ],
  controllers: [PurchaseController],
  providers: [PurchaseService],
  exports: [],
})
export class PurchasesModule {}
