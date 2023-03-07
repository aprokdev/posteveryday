import { PrismaClient } from '@prisma/client';

// import { S3 } from 'aws-sdk';

export const prisma = new PrismaClient();

// export const s3 = new S3({
//     accessKeyId: process.env.AWS_ACCESS_KEY,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
// });

// const mysql = require('mysql');
// export const db = mysql.createPool({
//     user: 'root',
//     password: '9001',
//     database: 'posteveryday',
// });

// db.connect(function (err) {
//     if (err) {
//         console.error('db connecting error: ' + err.stack);
//         return;
//     }
//     console.log('db connected as id ' + db.threadId);
// });

// export function DBquery(query): Promise<any> {
//     return new Promise((res, rej) => {
//         db.query(query, function (error, results, fields) {
//             if (error) {
//                 rej(error);
//             }
//             res({ results, fields });
//         });
//     });
// }

// export {};
