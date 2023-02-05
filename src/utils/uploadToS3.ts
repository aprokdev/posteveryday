import { s3 } from 'backend';

export async function uploadS3File(fileBuffer, path, fileName): Promise<any> {
    const params = {
        Bucket: `posteveryday/${path}`, // pass your bucket name
        Key: fileName, // file will be saved as testBucket/contacts.csv
        Body: fileBuffer,
    };
    return new Promise((res, rej) => {
        s3.upload(params, function (s3Err, data) {
            if (s3Err) {
                rej(s3Err);
            }
            res(data);
        });
    });
}

export async function uploadS3Image(fileBuffer, fileName): Promise<any> {
    return uploadS3File(fileBuffer, 'images', fileName);
}
