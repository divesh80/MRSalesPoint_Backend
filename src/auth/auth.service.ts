import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async validateAdmin({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    // Find admin by email
    const admin = await this.prismaService.admin.findUnique({
      where: { email },
    });

    // Validate password
    if (admin && admin.password === password) {
      // You can generate and return a JWT token here
      return { message: 'Login successful' };
    } else {
      throw new Error('Invalid credentials');
    }
  }
}
