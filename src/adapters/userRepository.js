// src/adapters/userRepository.js

const User = require("../domain/user");

class UserRepository {
  async add(user) {
    return await User.create(user);
  }

  async findByUsername(username) {
    return await User.findOne({ where: { username } });
  }
}

module.exports = UserRepository;
