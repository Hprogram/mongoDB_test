const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;

exports.getUsers = async function (query, limit) {
  try {
    const users = await User.find(query).limit(limit); // limit는 원하는 만큼만 보내줄 수 있음.
    return users;
  } catch (err) {
    throw err;
  }
};

exports.getUser = async function (query, limit) {
  try {
    const user = await User.findOne(query).limit(limit); // limit는 원하는 만큼만 보내줄 수 있음.
    return user;
  } catch (err) {
    throw err;
  }
};

exports.hashPassword = async function (password) {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashpassword = await bcrypt.hash(password, salt);
  return hashpassword;
};

exports.comparePassword = async function (password, hashpassword) {
  const compare = bcrypt.compareSync(password, hashpassword);
  return compare;
};
