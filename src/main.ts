import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //app.useGlobalFilters(new DemoFilter());
  //app.useGlobalPipes(new ValidationPipe());
  //app.useGlobalInterceptors(new LogginInterceptor(), new TransformInterceptor());

  await app.listen(3000);
}
bootstrap();
