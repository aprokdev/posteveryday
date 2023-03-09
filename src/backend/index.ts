import { PrismaClient } from '@prisma/client';
import { S3 } from 'aws-sdk';

export const s3 = new S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export const prisma = new PrismaClient();
prisma.$connect();
