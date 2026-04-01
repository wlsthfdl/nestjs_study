import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatsModule } from './cats/cats.module';
import { LoggerMiddleware } from './cats/middleware/logger.middleware';
import { AuthModule } from './auth/auth.module';
import { ormConfig } from './orm.config';
import { ArticleModule } from './article/article.module';
import { CommentModule } from './comment/comment.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './filter/http-exception.filter';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: ormConfig,
    }),
    CatsModule,
    AuthModule,
    ArticleModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: HttpExceptionFilter }, //의존성 주입으로 exception filter사용
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cats');
  }
}
