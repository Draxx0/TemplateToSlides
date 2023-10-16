import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getTemplate(): string {
    return 'Hello World!';
  }
}
