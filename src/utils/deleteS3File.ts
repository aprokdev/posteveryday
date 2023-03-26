import { s3 } from '@backend/index';
import { IAPIResponse } from '@frontend/api/types';

export function deleteS3File(key): Promise<IAPIResponse> {
    return new Promise((res, rej) => {
        s3.deleteObject({ Bucket: 'posteveryday', Key: key }, function (err, data) {
            if (err) {
                console.log('deleteS3File err');
                rej(err);
            } else {
                console.log('deleteS3File success');
                res({ success: true });
            }
        });
    });
}
