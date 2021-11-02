const User = require("../models/User");

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
