import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const prismaService = app.get(PrismaService);
  //await prismaService.enableShutDownHooks(app);

  app.setGlobalPrefix("api");
  app.enableCors(); // read, connect with front-end
  await app.listen(4200);
}
bootstrap();
