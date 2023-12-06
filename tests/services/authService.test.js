// tests/services/authService.test.js
const { expect } = require("chai");
const sinon = require("sinon");
const AuthService = require("../../src/services/authService");
const UserRepository = require("../../src/adapters/userRepository");

describe("AuthService", () => {
  let authService, mockUserRepository;

  beforeEach(() => {
    mockUserRepository = sinon.mock(UserRepository.prototype);
    authService = new AuthService();
  });

  afterEach(() => {
    mockUserRepository.restore();
  });

  it("should register a user", async () => {
    const userData = {
      username: "testuser",
      password: "password",
      email: "test@example.com",
    };
    mockUserRepository.expects("add").withArgs(sinon.match.object).resolves();

    await authService.register(
      userData.username,
      userData.password,
      userData.email
    );

    mockUserRepository.verify();
  });

  // Add tests for login and other methods
});
