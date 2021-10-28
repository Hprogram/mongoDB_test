const express = require("express");
const router = express.Router();
const multer = require("multer");

const Song = require("../models/Song");

// 음원 업로드 post (음원 한개 등록)
router.post("/", async (req, res) => {
  // console.log(req.body);
  const findSong = await User.findOne({ title: req.body.title });
  console.log(findSong);
  if (findSong !== null) {
    res.status(401).send("이미 등록된 음원 입니다.");
  } else {
    const song = new Song({
      title: req.body.title, // 곡 이름
      artist: req.body.artist, // 아티스트
      description: req.body.description, // 곡 설명
      introArtist: req.body.introArtist, // 아티스트 소개
      albumName: req.body.albumName, // 앨범명
      genre: req.body.genre, // 장르(배열)
      situation: req.body.situation, // 상황(배열)
      feeling: req.body.feeling, // 기분(배열)
      atmos: req.body.atmos, // 입체음향 여부 (파일경로)
      thumbnail: req.body.thumbnail, // 썸네일 이미지 경로
      binaural: req.body.binaural, // 바이노럴 비트 수 (숫자)
      carrier: req.body.carrier, // 캐리어 주파수 (숫자)
      biling: req.body.biling, // 과금 여부 (boolean)
      filepath: req.body.filepath, // 파일 경로
    });
    try {
      const savedSong = await song.save();
      res.send(savedSong);
    } catch (err) {
      res.send({ messeage: "올바르지 않은 입력입니다." });
    }
  }
});

module.exports = router;
