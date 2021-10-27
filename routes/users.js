const express = require("express");
const router = express.Router();
const User = require("../models/User");

// 모든 유저 정보 get (limit로 숫자 제한 가능)
router.get("/", async (req, res) => {
  try {
    const users = await User.find().limit(10); // limit는 원하는 만큼만 보내줄 수 있음.
    res.send(users);
  } catch (err) {
    res.send({ message: err });
  }
});

// 유저의 마이페이지 접근
router.get("/mypage", async (req, res) => {
  res.send("We are on mypage");
});

// 한명의 유저 정보 get (유저 ID로 검색)
router.get("/:userId", async (req, res) => {
  // console.log(req.params.userId);
  try {
    // const user = await User.findById(req.params.userId); // 고유 아이디를 검색할 경우
    const user = await User.findOne({ email: req.params.userId }); // email 등 여러 조건으로 검색할 경우
    res.send(user);
  } catch (err) {
    res.status(401).send({ message: err });
  }
});

// 한명의 유저 정보 delete (유저 ID or email로 삭제)
router.delete("/:userId", async (req, res) => {
  try {
    // const user = await User.deleteOne({_id:req.params.userId}); // 고유 아이디를 검색할 경우
    const deleteUser = await User.deleteOne({ email: req.params.userId }); // email 등 여러 조건으로 검색할 경우, deleteOne은 한 개만 삭제
    res.send(deleteUser);
  } catch (err) {
    res.status(401).send({ message: err });
  }
});

// 한명의 유저 정보 update (유저 비밀번호 변경)
router.patch("/:userId", async (req, res) => {
  const findUser = await User.findOne({ email: req.params.userId });

  // console.log(findUser);
  if (findUser === null) {
    res.status(401).send("해당 사용자가 존재하지 않습니다.");
  } else {
    try {
      findUser.password = req.body.password;
      findUser.save();
      // const user = await User.updateOne({_id:req.params.userId}); // 고유 아이디를 검색할 경우
      // const updateUser = await User.updateOne(
      //   { email: req.params.userId },
      //   {
      //     $set: {
      //       password: req.body.password,
      //     },
      //   }
      // ); // email 등 여러 조건으로 검색할 경우
      res.send(findUser);
    } catch (err) {
      res.status(401).send({ message: err });
    }
  }
});

// 회원가입 (중복 알고리즘 삽입)
router.post("/", async (req, res) => {
  // console.log(req.body);
  const findUser = await User.findOne({ email: req.body.email });
  // console.log(findUser);
  if (findUser !== null) {
    res.status(401).send("이미 가입된 이메일 입니다.");
  } else {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
      birth: req.body.birth,
      phoneNumber: req.body.phoneNumber,
      state: req.body.state,
    });
    try {
      const savedUser = await user.save();
      res.send(savedUser);
    } catch (err) {
      res.send({ messeage: "올바르지 않은 입력입니다." });
    }
  }
});

// 특정 상태를 가지고 있는 유저 찾기

router.get("/state/:state", async (req, res) => {
  // console.log(req.params.userId);
  try {
    // const user = await User.findById(req.params.userId); // 고유 아이디를 검색할 경우
    const user = await User.find({ state: req.params.state }); // email 등 여러 조건으로 검색할 경우
    console.log(user);
    res.send(user);
  } catch (err) {
    res.status(401).send({ message: err });
  }
});

module.exports = router;
