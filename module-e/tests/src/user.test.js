const UserService = require("./UserService");


describe("UserService", () => {
  
    test("defines addUser()", () => {
      expect(typeof UserService.addUser).toBe("function");
    });
    test("addUser() returns object when called", () => {
        expect(typeof UserService.addUser({name: 'gica'} )).toBe("object");
      });
    test("getUserById returns object when called", () => {
        var newUser = UserService.addUser({name: 'gica'} );
        expect(typeof UserService.getUserById(newUser.id)).toBe("object");
    });

  });