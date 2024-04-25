import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const accessKeyId = process.env.AWS_ACCESS_KEY_ID || process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY;
const region = process.env.AWS_S3_REGION || process.env.NEXT_PUBLIC_AWS_S3_REGION;
const buckerName = process.env.AWS_S3_BUCKET_NAME || process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME;



if (!accessKeyId) throw new Error("AWS Access key id is not given")
if (!secretAccessKey) throw new Error("AWS Secret Access key is not given")
if (!region) throw new Error("AWS region is not given")
if (!buckerName) throw new Error("AWS bucker name is not given")



function slugify(text: string): string {
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
}



AWS.config.update({
  accessKeyId ,
  secretAccessKey,
  region,
});


export const s3 = new AWS.S3();

export async function uploadFileToS3(file: File) {
    const s3 = new AWS.S3();

    const params = {
        Bucket: buckerName as string,
        Key: `uploads/${uuidv4()}_${slugify(file.name)}`, // Specify the filename
        Body: file, // File stream or buffer
        // ACL: 'public-read' // Optionally set the access control
    };

    try {
        const data = await s3.upload(params).promise();
        console.log('File uploaded successfully. Location:', data.Location);
        return data.Location; // Return the URL of the uploaded file
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
}
