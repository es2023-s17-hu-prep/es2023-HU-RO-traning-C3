const UserService = require("./UserService");

// tests for the Service
describe("UserService tests", () => {
  let service;

  // initialize the service and set a few fake items
  beforeAll(() => {
    service = UserService;
    service.users = [
      { id: 1, name: "Jani" },
      { id: 2, name: "Oliver" },
    ];
  });

  // test whether the service can give back the user by their id
  it("should get a user by id", () => {
    const result = service.getUserById(2);
    expect(result).toEqual({ id: 2, name: "Oliver" });
  });

  // test whether the service returns undefined when i pass a user id that doesnt exist
  it("should be null", () => {
    const result = service.getUserById(22324321);
    expect(result).toBe(undefined);
  });

  // test whether the user service can add a new user
  it("should add a new user", () => {
    const newUser = { id: 3, name: "Zoli" };
    const result = service.addUser(newUser);

    expect(result).toBe(newUser);
    expect(service.users).toEqual([
      { id: 1, name: "Jani" },
      { id: 2, name: "Oliver" },
      { id: 3, name: "Zoli" },
    ]);
  });
});
