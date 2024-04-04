import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import mikroOrmConfig from './mikro-orm.config';
import { MikroORM } from '@mikro-orm/core';
import { ValidationPipe } from '@nestjs/common';
import { initSwagger } from '../api/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.discoverEntities();

  initSwagger(app);

  await app.listen(8000);
}
bootstrap();
