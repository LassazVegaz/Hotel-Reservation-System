import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './shared/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(4001);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
}
bootstrap();
