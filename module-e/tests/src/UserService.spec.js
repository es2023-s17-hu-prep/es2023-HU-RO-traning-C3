const userService = require("./UserService")

/**
 * This function creates a random user
 */
function createRandomUser() {
    return userService.addUser({name: Math.random() * 9999})
}

/**
 * Tests for the user service
 */
describe("User Service", () => {
    /**
     * Tests for the addUser function
     */
    describe("Add user", () => {
        it("should add users", () => {
            // Given I have the details of a user
            const data = {
                name: "Jani"
            };

            // When I call the addUser method with the data
            const result = userService.addUser(data);

            // I should get back the user details and the generated ID
            expect(result.name).toBe("Jani");
            expect(result.id).toBe(1)
        });
    });

    /**
     * Tests for the getUser function
     */
    describe("Get user", () => {
        it('should find users', () => {
            // Giver I have a user
            const existing = createRandomUser();

            // When I call the getUserById with the user id
            const user = userService.getUserById(existing.id);

            // Then I should get back the user details
            expect(user.name).toBe(existing.name)
        });

        it("should return undefined for non-existing users", () => {
            // Given I have an id, which does not belong to any user
            const nonExistingUserId = 9999;

            // When I call the getUserById with the non existing user id
            const result = userService.getUserById(nonExistingUserId);

            // Then I should get back undefined
            expect(result).toBeUndefined()
        })
    });
})