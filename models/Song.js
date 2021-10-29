const mongoose = require("mongoose");

const SongSchema = mongoose.Schema({
  // 곡 이름
  title: {
    type: String,
    required: true,
  },
  // 아티스트
  artist: {
    type: String,
    required: true,
  },
  // 아티스트 소개
  introArtist: {
    type: String,
    required: true,
  },
  // 곡설명
  description: {
    type: String,
    required: true,
  },
  // 앨범명
  albumName: {
    type: String,
    required: true,
  },

  // 카테고리
  category: {
    type: Object,
    required: true,
  },
  /*--------------------//
  // 3가지를 카테고리로 통합
  // 장르
  genre: {
    type: [String],
    required: true,
  },
  // 상황
  situation: {
    type: [String],
    required: true,
  },
  // 기분
  feeling: {
    type: [String],
    required: true,
  },

   //--------------------*/

  // 입체음향 (돌비) 경로
  atmos: {
    type: String,
    required: true,
  },
  // 썸네일 이미지 경로
  thumbnail: {
    type: String,
    required: true,
  },

  // 바이노럴비트 수
  binaural: {
    type: Number,
    required: true,
  },
  // 캐리어 주파수
  carrier: {
    type: Number,
    required: true,
  },

  // 과금 여부
  biling: {
    type: Boolean,
    required: true,
  },

  // 파일 이미지 경로
  filepath: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Songs", SongSchema);
