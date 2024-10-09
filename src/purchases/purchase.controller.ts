import { Controller, Post, Body } from '@nestjs/common';
import { PurchaseService } from './purchase.service';

@Controller('purchases')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  async buyItem(@Body('userId') userId: number, @Body('itemId') itemId: number) {
    return this.purchaseService.buyItem(userId, itemId);
  }
}