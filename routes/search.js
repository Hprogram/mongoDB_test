const express = require("express");
const router = express.Router();
const multer = require("multer");

const Song = require("../models/Song");

// 모든 음원 불러오기 (limit로 10개 까지만)
router.get("/", async (req, res) => {
  try {
    const songs = await Song.find().limit(10); // limit는 원하는 만큼만 보내줄 수 있음.
    res.send(songs);
  } catch (err) {
    res.send({ message: err });
  }
});

// 원하는 제목의 음원 정보 불러오기
router.get("/:title", async (req, res) => {
  try {
    const songs = await Song.findOne({
      title: req.params.title,
    }); // limit는 원하는 만큼만 보내줄 수 있음.
    if (songs === null) {
      res.status(401).send({ message: "해당 음원이 없습니다." });
    } else {
      res.send(songs);
    }
  } catch (err) {
    res.send({ message: err });
  }
});

module.exports = router;
