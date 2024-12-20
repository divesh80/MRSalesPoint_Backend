// src/products/products.controller.ts
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Product } from '@prisma/client'; // Import Product type
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly cloudinaryService: CloudinaryService, // Inject CloudinaryService
  ) {}

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Post()
  async create(
    @Body()
    product: {
      name: string;
      description: string;
      price: number;
      imageUrl: string;
    },
  ): Promise<Product> {
    return this.productsService.create(product);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file')) // Interceptor to handle file uploads
  async uploadProductImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('No file uploaded');
    }

    const result = await this.cloudinaryService.uploadImage(file);
    return { imageUrl: result.secure_url }; // Return the URL of the uploaded image
  }
}
