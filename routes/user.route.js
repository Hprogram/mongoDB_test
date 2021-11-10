const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");

router.get("/", UserController.getUsers);
router.post("/signup", UserController.postSignup);
router.post("/signin", UserController.postSignin);
// router.get("/mypage", UserController.getMypage);
// router.get("/:email", UserController.getUser);

module.exports = router;
