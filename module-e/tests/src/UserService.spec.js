const userService = require('./UserService');

/**
 * Tests for the user service class
 */
describe('User Service', function () {
    /**
     * Reset state between tests
     */
    beforeEach(function () {
        userService.users = [];
    });

    /**
     * Tests for the setUserDiscount method
     */
    describe('addUser', function () {
        it('should create users', function () {
            // Given I have the details of a user
            const data = {name: "Test"}

            // When I call the addUser
            const user = userService.addUser(data);

            // Then I should get back the user with the generated ID
            expect(user).toEqual({...data, id: expect.anything()})
        });
    });

    /**
     * Tests for the getUserById method
     */
    describe('getUserById', function () {
        it('should find users', function () {
            // Given I have a user
            const data = {name: 'Jani'};
            const {id} = userService.addUser(data);

            // When I call the getUserById
            const user = userService.getUserById(id);

            // Then I should get the discount back
            expect(user).toEqual(data);
        });

        it('should return undefined if user is not found', function () {
            // Given I have a non-existing user id
            const userId = 9999;

            // When I call the getUserDiscount
            const user = userService.getUserById(userId);

            // Then I should get back 0
            expect(user).toBeUndefined()
        });
    })
});