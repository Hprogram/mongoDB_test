const express = require("express");
const UserService = require("../services/user.service");
const router = express.Router();
const User = require("../models/User");

// 다수의 유저 정보 get (limit로 10명 한정)
exports.getUsers = async function (req, res, next) {
  // console.log(req.params);
  // console.log(req.query);
  let email = req.query.email ? { email: req.query.email } : {};
  console.log(email);

  let limit = req.params.limit ? req.params.limit : 10;
  try {
    const users = await UserService.getUsers(email, limit); // {}는 쿼리문 limit는 가져올 유저정보 수
    return res.status(200).json({
      status: 200,
      data: users,
      message: "정상적으로 유저 정보를 가져왔습니다.",
    });
  } catch (err) {
    return res.status(400).json({ status: 400, message: err.message });
  }
};

// 한명의 유저 정보 get (유저 ID로 검색)
exports.getUser = async function (req, res, next) {
  // console.log(req.params.userId);
  try {
    // const user = await User.findById(req.params.userId); // 고유 아이디를 검색할 경우
    const user = await UserService.getUser(
      { email: req.params.email },
      req.params.limit
    ); // email 등 여러 조건으로 검색할 경우
    return res.status(200).json({
      status: 200,
      data: user,
      message: "정상적으로 유저 정보를 가져왔습니다.",
    });
  } catch (err) {
    return res.status(400).json({ status: 400, message: err.message });
  }
};

// 모든 유저 정보 get (limit로 숫자 제한 가능)
// router.get("/", async (req, res) => {
//   try {
//     const users = await User.find().limit(10); // limit는 원하는 만큼만 보내줄 수 있음.
//     res.send(users);
//   } catch (err) {
//     res.send({ message: err });
//   }
// });

// 유저의 마이페이지 접근
router.get("/mypage", async (req, res) => {
  res.send("We are on mypage");
});

// 한명의 유저 정보 delete (유저 ID or email로 삭제) /:userId ,/:email
exports.deleteUser = async function (req, res, next) {
  try {
    // const user = await User.deleteOne({_id:req.params.userId}); // 고유 아이디를 검색할 경우
    const deleteUser = await User.deleteOne({ email: req.params.userId }); // email 등 여러 조건으로 검색할 경우, deleteOne은 한 개만 삭제
    res.send(deleteUser);
  } catch (err) {
    res.status(400).send({ message: err });
  }
};

// 한명의 유저 정보 update (유저 비밀번호 변경) /:userId
exports.patchUser = async function (req, res, next) {
  const findUser = await User.findOne({ email: req.params.userId });

  // console.log(findUser);
  if (findUser === null) {
    res.status(400).send("해당 사용자가 존재하지 않습니다.");
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
      res.status(400).send({ message: err });
    }
  }
};

// 특정 상태를 가지고 있는 유저 찾기 /state/:state
exports.stateUser = async function (req, res, next) {
  try {
    // const user = await User.findById(req.params.userId); // 고유 아이디를 검색할 경우
    const user = await User.find({ state: req.params.state }); // email 등 여러 조건으로 검색할 경우
    console.log(user);
    res.send(user);
  } catch (err) {
    res.status(400).send({ message: err });
  }
};

// 회원가입 (중복 email 불가 알고리즘 삽입)
exports.postSignup = async function (req, res, next) {
  const findUser = await User.findOne({ email: req.body.email });
  // console.log(findUser);
  if (findUser !== null) {
    res.status(400).send("이미 가입된 이메일 입니다.");
  } else {
    const hashpassword = await UserService.hashPassword(req.body.password);

    const user = new User({
      email: req.body.email,
      password: hashpassword,
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
};

// 로그인 (jwt 적용 X)
exports.postSignin = async function (req, res, next) {
  const findUser = await User.findOne({ email: req.body.email });
  if (findUser === null) {
    res.status(400).send({ message: "가입되지 않은 이메일입니다." });
  } else {
    const compare = await UserService.comparePassword(
      req.body.password,
      findUser.password
    );
    if (compare !== true) {
      res.status(400).json({ message: "비밀번호가 일치하지 않습니다." });
    } else {
      // res.cookie() // jwt토큰으로 인증하기위해 넘겨줌.
      res.status(200).json({ message: "로그인 성공!" });
    }
  }
};
