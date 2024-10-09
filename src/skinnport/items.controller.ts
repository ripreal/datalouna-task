import { Controller, Get, HttpStatus, Req, Res } from "@nestjs/common";
import { ItemsService } from "./items.service";


@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {
    let t1 = ''
  }

  @Get()
  async getItems(@Res() res, @Req() req: any) {
    return res
      .status(HttpStatus.OK)
      .json(await this.itemsService.getItems());
  }
}