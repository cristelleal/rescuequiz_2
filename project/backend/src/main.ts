import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import mikroOrmConfig from './mikro-orm.config';
import { MikroORM } from '@mikro-orm/core';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.discoverEntities();

  await app.listen(8000);
}
bootstrap();
