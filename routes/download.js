require("dotenv/config");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const AWS = require("aws-sdk");

const options = {
  keypairId: "APKAJAT5Z6UEHBXIEQTQ",
  privateKeyPath: "pk-APKAJAT5Z6UEHBXIEQTQ.pem",
  expireTime: new Date().getTime() + 30000,
};

let privateKey = fs.readFileSync("./pk-APKAJAT5Z6UEHBXIEQTQ.pem", "base64");
// console.log(privateKey);

const policy = JSON.stringify({
  Statement: [
    {
      Resource: "https://api.mulief.com/*",
      Condition: {
        DateLessThan: {
          "AWS:EpochTime": new Date().getTime() + 300000,
        },
      },
    },
  ],
});

// const ID = process.env.ACCESS_KEY_ID;
// const SECRET = process.env.SECRET_KEY;
// const BUCKET_NAME = process.env.BUCKET_NAME;

// const downloadFile = async (fileName) => {
//   const file = fs.createWriteStream("test.mp4");
//   const params = {
//     Bucket: BUCKET_NAME,
//     Key: fileName,
//   };
//   s3.getObject(params).createReadStream().pipe(file);
//   return file;
// };
router.get("/", async (req, res) => {
  const cf = new AWS.CloudFront.Signer("APKAJAT5Z6UEHBXIEQTQ", privateKey);

  //   const singedURL = cf.getSignedUrl(
  //     "https://d3g2qf02fqb0dq.cloudfront.net/strawberrymoon.mp4",
  //     options
  //   );
  //   res.send(singedURL);
  //   const options = {
  //     url: "https://d3g2qf02fqb0dq.cloudfront.net/*",
  //     expires: Math.round(new Date().getTime() / 1000) + 3600,
  //   };

  let signedURL = cf.getSignedUrl(options);

  //   for (let cookieId in signedCookies) {
  //     res.cookie(cookieId, signedCookies[cookieId]);
  //   }
  //   res.status(200).send("success signed Cookies");
  //   console.log("Singed URL: ", singedURL);
  res.send({ signedURL: signedURL });
});

//
router.post("/", async (req, res) => {
  let path = await req.query.path;
  console.log(path);
  //   let file = await downloadFile("strawberrymoon.mp4");

  /* Code to Verify the credentials */
  //   console.log(PUBLIC_KEY);

  // Set Cookies after successful verification
  //   console.log(policy);

  // Send some response
  res.send({ some: "response" });
});

module.exports = router;
