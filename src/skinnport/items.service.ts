import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiSkinnport } from 'src/skinnport/api/api.skinnport';
import { SkinnportItem } from 'src/skinnport/entities/skinnport.item';

@Injectable()
export class ItemsService {
  private logger = new Logger(ItemsService.name);
  constructor(
    private readonly apiSkinnport: ApiSkinnport
  ) {}

  async getItems() {
    const itemsNoTradable: SkinnportItem[] = await this.apiSkinnport.getItems(false);
    const itemsTradable: SkinnportItem[] = await this.apiSkinnport.getItems(true);

    const groupedItems = {};

    itemsNoTradable.forEach(item => {
      if (!groupedItems[item.market_hash_name]) {
        groupedItems[item.market_hash_name] = { ...item, no_tradable_min_price: item.min_price, tradable_min_price: null };
      } else {
        groupedItems[item.market_hash_name].no_tradable_min_price = item.min_price;
      }
    });

    itemsTradable.forEach(item => {
      if (!groupedItems[item.market_hash_name]) {
        groupedItems[item.market_hash_name] = { ...item, no_tradable_min_price: null, tradable_min_price: item.min_price };
      } else {
        groupedItems[item.market_hash_name].tradable_min_price = item.min_price;
      }
    });

    const result = Object.values(groupedItems);

    return result;
  }
}