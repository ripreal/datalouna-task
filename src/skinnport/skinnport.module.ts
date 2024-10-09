import { Module } from '@nestjs/common';
import { ApiSkinnport } from './api/api.skinnport';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';

@Module({
  imports: [],
  providers: [ApiSkinnport, ItemsService],
  controllers: [ItemsController],
  exports: [],
})
export class SkinnportModule {}
