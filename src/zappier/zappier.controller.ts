import { Controller, Get } from '@nestjs/common';
import { ZappierService } from './zappier.service';

@Controller()
export class ZappierController {
  constructor(private readonly zappierService: ZappierService) {}

  @Get()
  getHello(): string {
    return this.zappierService.getHello();
  }
}
