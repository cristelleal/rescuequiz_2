import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import config from './mikro-orm.config';
import { UsersController } from './users/users.controller';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { ScoresModule } from './scores/scores.module';
import { ScoresController } from './scores/scores.controller';

@Module({
  imports: [
    MikroOrmModule.forRoot(config),
    AuthModule,
    UsersModule,
    ScoresModule,
  ],
  controllers: [
    AppController,
    UsersController,
    AuthController,
    ScoresController,
  ],
  providers: [AppService, AuthService],
})
export class AppModule {}
