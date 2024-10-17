import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './modules/posts/posts.module';
import { PostMiddleware } from './core/middlewares/post/post.middleware';
import { DemoAuthGuard } from './core/guards/demo-auth.guard';
import { DemoRolesGuard } from './core/guards/demo-roles.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/user.module';
import { CategoryModule } from './modules/category/category.module';
import { RoleModule } from './modules/roles/role.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'nestjs_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true
    }),
    PostsModule,
    UserModule,
    CategoryModule,
    RoleModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: 'APP_GUARD',
      useClass: DemoAuthGuard
    },
    {
      provide: 'APP_GUARD',
      useClass: DemoRolesGuard
    }
    // {
    //   provide: 'APP_INTERCEPTOR',
    //   useClass: ErrorsInterceptor
    // }
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //
    consumer
      .apply(PostMiddleware)
      .forRoutes('posts');
  }


}
