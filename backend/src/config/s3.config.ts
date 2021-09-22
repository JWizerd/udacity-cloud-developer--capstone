import { S3ModuleOptions } from 'nestjs-s3';

export const s3Config: S3ModuleOptions = {
  config: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY,
    secretAccessKey: process.env.AWS_S3_SECRET,
    endpoint: `https://s3.us-west-1.amazonaws.com`,
    s3ForcePathStyle: true,
    signatureVersion: 'v4',
  },
};
