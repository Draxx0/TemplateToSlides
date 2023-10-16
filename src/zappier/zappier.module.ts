import { Module } from '@nestjs/common';
import { ZappierService } from './zappier.service';
import { ZappierController } from './zappier.controller';

@Module({
  imports: [],
  controllers: [ZappierController],
  providers: [ZappierService],
})
export class AppModule {}
