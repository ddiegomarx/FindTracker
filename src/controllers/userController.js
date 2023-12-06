// Exemplo em src/controllers/userController.js:

const AuthService = require("../services/authService");

const authService = new AuthService();

async function registerUser(req, res) {
  try {
    await authService.register(
      req.body.username,
      req.body.password,
      req.body.email
    );
    res.status(201).send("User registered successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
}

async function loginUser(req, res) {
  try {
    const token = await authService.login(req.body.username, req.body.password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).send(error.message);
  }
}

module.exports = {
  registerUser,
  loginUser,
};
