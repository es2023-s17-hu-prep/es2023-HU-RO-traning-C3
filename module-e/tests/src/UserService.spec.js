const UserService = require("./UserService");

/**
 * Tests for the user service
 */
describe("UserService tests", () => {
  let service;

  /**
   * Create a new service every time
   */
  beforeEach(() => {
    service = UserService;
    service.users = [];
  });

  /**
   * Test should add a user
   */
  it("should add a user", () => {
    // given
    const expected = { id: 1, name: "Johnny" };

    // when
    const result = service.addUser({ name: "Johnny" });

    // then
    expect(result).toEqual(expected);
    expect(service.users).toEqual([expected]);
  });

  /**
   * Test should get a user by id
   */
  it("should get a user by id", () => {
    // given
    const users = [{ id: 1, name: "Johnny" }];
    service.users = users;

    // when
    const result = service.getUserById(1);

    // then
    expect(result).toEqual(users[0]);
  });
});
