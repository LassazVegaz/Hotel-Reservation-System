import { NestFactory } from '@nestjs/core';
import { env } from 'process';
import { AppModule } from './app.module';
import { PrismaService } from './shared/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(env.PORT);

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
}
bootstrap();
