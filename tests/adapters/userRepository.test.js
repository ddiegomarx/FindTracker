const { expect } = require("chai");
const sinon = require("sinon");
const UserRepository = require("../../src/adapters/userRepository");
const User = require("../../src/domain/user");

describe("UserRepository", () => {
  let userRepository;
  let mockUserModel;

  beforeEach(() => {
    mockUserModel = sinon.mock(User);
    userRepository = new UserRepository();
  });

  afterEach(() => {
    mockUserModel.restore();
  });

  describe("add", () => {
    it("should add a new user", async () => {
      const userData = {
        username: "testuser",
        password: "password",
        email: "test@example.com",
      };
      mockUserModel.expects("create").withArgs(userData).resolves(userData);

      const result = await userRepository.add(userData);
      expect(result).to.eql(userData);
      mockUserModel.verify();
    });
  });

  describe("findByUsername", () => {
    it("should find a user by username", async () => {
      const username = "testuser";
      const userObject = {
        username,
        password: "password",
        email: "test@example.com",
      };
      mockUserModel
        .expects("findOne")
        .withArgs({ where: { username } })
        .resolves(userObject);

      const result = await userRepository.findByUsername(username);
      expect(result).to.eql(userObject);
      mockUserModel.verify();
    });

    it("should return null when user is not found", async () => {
      const username = "nonexistentuser";
      mockUserModel
        .expects("findOne")
        .withArgs({ where: { username } })
        .resolves(null);

      const result = await userRepository.findByUsername(username);
      expect(result).to.be.null;
      mockUserModel.verify();
    });
  });
});
