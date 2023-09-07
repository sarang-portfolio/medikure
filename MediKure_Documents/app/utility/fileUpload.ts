import AWS from "aws-sdk";
import fs from "fs";
import multer from "multer";

const { SECRET_ACCESS_KEY, ACCESS_KEY_ID, BUCKET_NAME } = process.env;
// configure the AWS SDK
AWS.config.update({
  accessKeyId: ACCESS_KEY_ID as string,
  secretAccessKey: SECRET_ACCESS_KEY as string,
  region: "US East (N. Virginia) us-east-1",
});
const s3 = new AWS.S3();
export const uploadFile = (fileName: any) => {
  // Read content from the file
  const fileContent = fs.readFileSync(fileName);
  // Setting up S3 upload parameters
  const params = {
    Bucket: BUCKET_NAME as string,
    Key: fileName,
    Body: fileContent,
  };
  // Uploading files to the bucket
  s3.upload(params, function (err: any, data: any) {
    if (err) {
      console.log(err);
      throw err;
    }
    console.log(`File uploaded successfully. ${data.Location}`);
  });
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage: storage }).array("file", 20);
