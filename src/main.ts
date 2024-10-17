import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DemoFilter } from "./core/filters/demo/demo.filter";
import { ValidationPipe } from '@nestjs/common'
import { LogginInterceptor } from "./core/interceptors/loggin/loggin.interceptor";
import { TransformInterceptor } from "./core/interceptors/transform/transform.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.useGlobalFilters(new DemoFilter());
  //app.useGlobalPipes(new ValidationPipe());
  //app.useGlobalInterceptors(new LogginInterceptor(), new TransformInterceptor());

  await app.listen(3000);
}
bootstrap();
