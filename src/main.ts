import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './constant/env.constant';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api', { exclude: ['/'] });
  app.enableCors();
  await app.listen(PORT);
}
bootstrap();
