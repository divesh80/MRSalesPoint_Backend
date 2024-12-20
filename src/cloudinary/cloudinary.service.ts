// src/cloudinary/cloudinary.service.ts
import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary'; // Import the 'v2' version

interface CloudinaryUploadResponse {
  secure_url: string; // This is the URL of the uploaded image
}

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  // Upload image method, with the proper Multer type for 'file'
  async uploadImage(
    file: Express.Multer.File,
  ): Promise<CloudinaryUploadResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { resource_type: 'auto' }, // Automatically determine the resource type
          (error, result) => {
            if (error) {
              reject(error);
            }
            resolve(result as CloudinaryUploadResponse); // Cast the result to CloudinaryUploadResponse type
          },
        )
        .end(file.buffer); // Pass the file buffer directly here
    });
  }
}
