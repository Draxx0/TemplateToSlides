import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './constant/env.constant';
import { ValidationPipe } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('TemplateToSlides API Documentation')
    .setDescription(
      "Here you'll find all the available endpoints so you can use them the right way!",
    )
    .setVersion('1.0')
    .addTag('template-to-slides')
    .build();

  const options: SwaggerDocumentOptions = {
    deepScanRoutes: true,
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('doc', app, document);

  app.setGlobalPrefix('api', { exclude: ['/'] });
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(PORT);
}
bootstrap();
