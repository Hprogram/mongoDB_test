const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const users = await User.find().limit(2); // limit는 원하는 만큼만 보내줄 수 있음.
    res.send(users);
  } catch (err) {
    res.send({ message: err });
  }
});

router.get("/mypage", async (req, res) => {
  res.send("We are on mypage");
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const user = new User({
    email: req.body.email,
    password: req.body.password,
    birth: req.body.birth,
    phoneNumber: req.body.phoneNumber,
  });
  try {
    const savedUser = await user.save();

    res.send(savedUser);
  } catch (err) {
    res.send({ messeage: "올바르지 않은 입력입니다." });
  }
});

module.exports = router;
