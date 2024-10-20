import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './modules/posts/posts.module';
import { PostMiddleware } from './core/middlewares/post/post.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { CategoryModule } from './modules/category/category.module';
import { RoleModule } from './modules/roles/role.module';
import { AuthModule } from './modules/auth/auth.module';
import { FileModule } from './modules/file/file.module';
import { ScheduleModule } from '@nestjs/schedule';
import { QueueModule } from './modules/queue/queue.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(), // 加载 .env 文件
    TypeOrmModule.forRoot({
      type: 'mysql',
      //在 Docker 容器中，localhost 指的是容器自身，而不是主机。
      //如果你的应用程序在 web 容器中运行，应该将数据库的主机名更改为服务名称 database，而不是 localhost。
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    PostsModule,
    UserModule,
    CategoryModule,
    RoleModule,
    AuthModule,
    FileModule,
    ScheduleModule.forRoot(),
    QueueModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: 'APP_GUARD',
    //   useClass: RolesGuard
    // }
    // {
    //   provide: 'APP_INTERCEPTOR',
    //   useClass: ErrorsInterceptor
    // }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //
    consumer.apply(PostMiddleware).forRoutes('posts');
  }
}
