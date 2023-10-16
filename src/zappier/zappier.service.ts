import { Injectable } from '@nestjs/common';

@Injectable()
export class ZappierService {
  getHello(): string {
    return 'Hello Zappier!';
  }
}
