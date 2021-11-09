require("dotenv/config");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const AWS = require("aws-sdk");
const cookieParser = require("cookie-parser");

let keyPairId = "APKAJAT5Z6UEHBXIEQTQ";
let privateKey =
  "-----BEGIN RSA PRIVATE KEY-----" +
  "\n" +
  "MIIEowIBAAKCAQEAsH71tdlfJER0NXrQd9a9Sl8woJ/cR3qsGN3HgtMBrtEN6IeL" +
  "\n" +
  "tML85W99nIOA1FolwDi+6ILWEO7lGzHVM/2B39fj7gkuHS+9RIe5JzJld05JlVGt" +
  "\n" +
  "quNQFsSDNTBm99J1RQqIPpo6ZE/mBDOGxZE5am2HNolbFUglWsATZ36iHAoLFL8T" +
  "\n" +
  "kmSgvfdPZPGmAu3gwl75ZNdH40xwv8yoIbhjGMzGRElUO4P5CKfSZk9Qhg1bViGG" +
  "\n" +
  "/AlKutUmKJByOIiBZWhNnFWo6spilTSWF7t2QOFrjaCVgeGvSv06yN6TnkXkLVA5" +
  "\n" +
  "5htQugxIqudCrb8/OastV9YQNte3GqqvyaiMHwIDAQABAoIBABHeWKv3fN1kHMvJ" +
  "\n" +
  "Sk/HqtRbvMWWSavm7IN7+JXzHOmA+sJ+7pL3Zrknx3TQD3vwQIAsfo91p4yBUyqk" +
  "\n" +
  "qewgj0SFS+sufL+xtJy6jPE99e3VPDfk1AtIBjS34nzBELuoT/0UauTDooPDXwsv" +
  "\n" +
  "2EYqRMDUo+rOjy0hZ76/UXeZ53mlE2w2QkeByWgnAFCttRrVN8CdEDHfdhMuHAzZ" +
  "\n" +
  "by5XE4xj1My8XdUvduyzrLEENbmulNagFmQT5rt1pNvP/9OtZi6WDMOGmIoypJBG" +
  "\n" +
  "D3guPE0sBySdZ1YhOwIqLucNA16FT0bEAqhPJVh+taNmoI8n0KrnSjGSRjBCK/EP" +
  "\n" +
  "bl9HCPECgYEA6bFTFWGqGJ9hDMYadmujaprJVi7s5WekBVsaErUAfxecEeaoL3M2" +
  "\n" +
  "yU0I8AVXYU7TsH3+d3YGaQSTdUdqw87jBvOZRjvGPbxP1lePeFqr4RYFf5s0KL6B" +
  "\n" +
  "HyivgQreU2QMkTW+X0CySVeWBejj5UbuRmAjs/vFuQTe0IExxyawlhcCgYEAwVfv" +
  "\n" +
  "sn++n/de4A11OzjnW2xFFUPlXvJ8u/7Rrj4PrACYy35rOI3p3m54NWwB0lwPecwG" +
  "\n" +
  "UMLsR3sOK4ShRwWhPVRIl1kFyiSYJn/78D1SsvAfZENtZC1X9CBn2AViHtUSK35U" +
  "\n" +
  "fYhJmMe9rFsj0J6hwMKwhd2vgYAgycTTVMv3hzkCgYEA54OTCdWti6MppFwGD1dn" +
  "\n" +
  "l88ss0Ld0g8xAVVVqT7D9STQqzNVX1zG4/p7Zj4EaRSMx4aquHKmuxebdk6ASOgH" +
  "\n" +
  "JfXi3R+Or86FUZWBPvyk1uLYI6kArXS9ur610COSSg8OHDWgGgGgHuS0bbphO91f" +
  "\n" +
  "ZT0NYduF8FwQ2YOEawW7X5UCgYARHqM3z/3mFjZNaoOl4c0CmFypnGBz/s6yqsaQ" +
  "\n" +
  "QiiLF2ZwJlqCIHbD3k5AlLa4lLQ+GaW5gvj+/1Nq4QySyFnVn1/qHtTXaFQcnJqH" +
  "\n" +
  "VDa9Z2uwKhRGmYk/MZtgUmG0zzMTrNT4ZJf3skAGQe+y6kjyU4rj35RJyDmfBBGe" +
  "\n" +
  "YY0iaQKBgCTzHZ7HR574ED+/pPYL8s6DUwSAfVs6MfGuNo7W3pp5rvofhhmUH0x/" +
  "\n" +
  "H/krG6UnxKkoj+PxB8KwwMgq5Oi++AJK/AaeQ/No7/QXy9tdAb9n2EU+M2qN0eMH" +
  "\n" +
  "ZW5oYTkNii+5lGm8ILpT4l67w9sTfeOBovB4xBwj9EKUZDvJnnCz" +
  "\n" +
  "-----END RSA PRIVATE KEY-----";

let cfUrl = "d3g2qf02fqb0dq.cloudfront.net";
let expiry = Math.floor(new Date().getTime() / 1000) + 60 * 5;
console.log(expiry);

let policy = {
  Statement: [
    {
      Resource: "http*://" + cfUrl + "/*",
      Condition: {
        DateLessThan: { "AWS:EpochTime": expiry },
      },
    },
  ],
};

let policyString = JSON.stringify(policy);

let signer = new AWS.CloudFront.Signer(keyPairId, privateKey);

router.get("/", async (req, res) => {
  let options = { url: "http://" + cfUrl, policy: policyString };

  signer.getSignedCookie(options, function (err, cookie) {
    if (err) {
      res.send(err);
    } else {
      console.log("cookies: ", cookie);
      for (let cookieId in cookie) {
        res.cookie(cookieId, cookie[cookieId]);
      }
      res.send(cookie);
    }
  });
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
