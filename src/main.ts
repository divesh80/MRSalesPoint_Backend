import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common'; // Import ValidationPipe

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Enable CORS for frontend (localhost:3001)
  app.enableCors({
    origin: 'http://localhost:3001', // Allow frontend to access backend
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
