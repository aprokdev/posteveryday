import { PrismaClient } from '@prisma/client';
import AWS from 'aws-sdk';

export const database = new PrismaClient();

export const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});
