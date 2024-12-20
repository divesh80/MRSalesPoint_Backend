import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../prisma/prisma.module'; // Import the Prisma module to access the database

@Module({
  imports: [PrismaModule], // Prisma module is required to interact with your database
  controllers: [AuthController], // Declare the AuthController to handle API routes
  providers: [AuthService], // Register the AuthService to handle authentication logic
})
export class AuthModule {}
