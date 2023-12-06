// src/use_cases/userCreate.test.js
const { expect } = require("chai");
const sinon = require("sinon");
const createUser = require("../../src/use_cases/userCreate");

const UserRepository = require("../../src/adapters/userRepository");

describe("userCreate Use Case", () => {
  let mockUserRepository;

  beforeEach(() => {
    mockUserRepository = sinon.mock(UserRepository.prototype);
  });

  afterEach(() => {
    mockUserRepository.restore();
  });

  it("should create a user", async () => {
    const userData = {
      username: "testuser",
      password: "password",
      email: "test@example.com",
    };
    mockUserRepository
      .expects("add")
      .withArgs(sinon.match.object)
      .resolves(userData);

    await createUser(userData, new UserRepository());

    mockUserRepository.verify();
  });
});
