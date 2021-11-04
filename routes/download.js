require("dotenv/config");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const AWS = require("aws-sdk");

AWS.config.region = "ap-northeast-2";

const ID = process.env.ACCESS_KEY_ID;
const SECRET = process.env.SECRET_KEY;
const BUCKET_NAME = process.env.BUCKET_NAME;

const s3 = new AWS.S3({ accessKeyId: ID, secretAccessKey: SECRET });

const downloadFile = async (fileName) => {
  const file = fs.createWriteStream("test.mp4");
  const params = {
    Bucket: BUCKET_NAME,
    Key: fileName,
  };
  s3.getObject(params).createReadStream().pipe(file);
  return file;
};

//
router.get("/", async (req, res) => {
  let file = await downloadFile("strawberrymoon.mp4");

  console.log("파일 다운로드");

  res.send(file);
});

module.exports = router;
