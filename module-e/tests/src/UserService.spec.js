const UserService = require("./UserService");

describe("UserService", () => {
    beforeEach(() => {
        UserService.users = [];
    })

    it("should add a user", () => {
        const user = {
            id: Math.floor(Math.random() * 100)
        };
        expect(UserService.addUser(user)).toBe(user);
        expect(UserService.users).toStrictEqual([user]);
        expect(UserService.getUserById(user.id)).toBe(user);
    });

});