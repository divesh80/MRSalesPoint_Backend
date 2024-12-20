// src/products/products.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Import PrismaService
import { Product } from '@prisma/client'; // Import the Prisma Product type

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  // Method to fetch all products
  async findAll(): Promise<Product[]> {
    return this.prisma.product.findMany(); // Use Prisma to get all products
  }

  // Method to create a new product
  async create(data: {
    name: string;
    description: string;
    price: number;
    imageUrl: string;
  }): Promise<Product> {
    return this.prisma.product.create({
      data, // Create a new product with the provided data
    });
  }
}
