import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { s3 } from '@backend/index';
import { IAPIResponse } from '@frontend/api/types';

export async function deleteS3File(key: string): Promise<IAPIResponse> {
    const command = new DeleteObjectCommand({ Bucket: process.env.AWS_S3_BUCKET_NAME, Key: key });
    await s3.send(command);
    return { success: true };
}
