import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import mikroOrmConfig from './mikro-orm.config';
import { MikroORM } from '@mikro-orm/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.discoverEntities();

  await app.listen(8000);
}
bootstrap();
