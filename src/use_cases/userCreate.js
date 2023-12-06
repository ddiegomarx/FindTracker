// src/use_cases/userCreate.js

const User = require("../domain/user");

function createUser(userData, userRepository) {
  const { username, password, email } = userData;
  const newUser = new User(null, username, password, email);
  // Aqui incluímos validações e lógica de negócios
  userRepository.add(newUser);
}

module.exports = createUser;
