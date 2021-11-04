require("dotenv/config");
const AWS = require("aws-sdk");
const ID = process.env.ACCESS_KEY_ID;
const SECRET = process.env.SECRET_KEY;
const BUCKET_NAME = process.env.BUKET_NAME;

const s3 = new AWS.S3({ accessKeyId: ID, secretAccessKey: SECRET });

const params = {
  Bucket: BUCKET_NAME,
  CreateBucketConfiguration: {
    LocationConstraint: "ap-northeast-2",
  },
};

s3.createBucket(params, function (err, data) {
  if (err) {
    console.log(err, err.stack);
  } else {
    console.log("Bucket Created Successfully", data.Location);
  }
});
