import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GLOBAL_API_PREFIX } from './main.constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(GLOBAL_API_PREFIX);

  const config = new DocumentBuilder()
    .setTitle('Library api')
    .setDescription('Документация по Library API')
    .setVersion('1.0')
    .addTag('auth')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${GLOBAL_API_PREFIX}/docs`, app, document);

  await app.listen(3000);
}

bootstrap();
