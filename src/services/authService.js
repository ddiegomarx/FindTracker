const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../domain/user");
const UserRepository = require("../adapters/userRepository");

const secretKey = process.env.JWT_SECRET_KEY || "your-secret-key";

class AuthService {
  async register(username, password, email) {
    const hashedPassword = this.hashPassword(password);
    const userRepository = new UserRepository();
    await userRepository.add({
      username: username,
      password: hashedPassword,
      email: email,
    });
  }

  async login(username, password) {
    const userRepository = new UserRepository();
    const user = await userRepository.findByUsername(username);
    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = this.verifyPassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      secretKey,
      { expiresIn: "1h" }
    );
    return token;
  }

  hashPassword(password) {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto
      .pbkdf2Sync(password, salt, 10000, 64, "sha512")
      .toString("hex");
    return `${salt}:${hash}`;
  }

  verifyPassword(inputPassword, hashedPassword) {
    const [salt, originalHash] = hashedPassword.split(":");
    const hash = crypto
      .pbkdf2Sync(inputPassword, salt, 10000, 64, "sha512")
      .toString("hex");
    return hash === originalHash;
  }
}

module.exports = AuthService;
