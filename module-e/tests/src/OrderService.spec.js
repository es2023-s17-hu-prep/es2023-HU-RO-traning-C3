const orderService = require("./OrderService");
const userService = require("./UserService");
const discountService = require("./DiscountService");

// Mock the dependencies
jest.mock('./UserService')
jest.mock('./DiscountService')

/**
 * This function creates a random order
 */
function createRandomOrder(userId) {
    userService.getUserById.mockImplementationOnce(() => ({id: userId, name: "Test"}));
    discountService.getUserDiscount.mockImplementationOnce(() => Math.random() * 100)

    const items = [{price: 100}, {price: 200}, {price: 300}];
    return orderService.placeOrder(userId, items);
}

/**
 * Tests for the order service
 */
describe('OrderService', () => {
    /**
     * Test the placeOrder function
     */
    describe('Place Order', () => {
        it('should throw an error when the user is not found', () => {
            // Given the userService returns null for the user
            userService.getUserById.mockImplementationOnce(() => null);

            // When I call the placeOrder method
            const call = () => orderService.placeOrder(1, []);

            // Then It should throw an error
            expect(call).toThrow('User not found')
        });

        it('should calculate the total without discounts', () => {
            // Given I have a user who does not have any discounts and the details of an order
            const items = [{price: 100}, {price: 200}, {price: 300}];
            const userId = 1;

            userService.getUserById.mockImplementationOnce(() => ({id: userId, name: "Test"}));
            discountService.getUserDiscount.mockImplementationOnce(() => 0)

            // When I call the placeOrder with a list of items
            const order = orderService.placeOrder(userId, items)

            // Then I should get back the order with the calculated amounts
            expect(order.totalAmount).toBe(600)
            expect(order.discountedAmount).toBe(600)
            expect(order.items).toBe(items)
            expect(order.userId).toBe(userId)
        });

        it('should calculate discounts', () => {
            // Given I have a user who has discounts and the details of an order
            const items = [{price: 100}, {price: 200}, {price: 300}];
            const userId = 1;

            userService.getUserById.mockImplementationOnce(() => ({id: userId, name: "Test"}));
            discountService.getUserDiscount.mockImplementationOnce(() => 50)

            // When I call the placeOrder with a list of items
            const order = orderService.placeOrder(userId, items)

            // Then I should get back the order with the calculated amounts
            expect(order.totalAmount).toBe(600)
            expect(order.discountedAmount).toBe(300)
        })
    });

    /**
     * Test the getUsersOrders function
     */
    describe('Get users orders', () => {
        it('should return the orders of a user', () => {
            // Given I have a user with multiple orders
            const userId = 100;
            const orders = [createRandomOrder(userId), createRandomOrder(userId)]

            // When I call the getUsersOrders method
            const result = orderService.getUserOrders(userId)

            // Then I should get back the orders of the user
            expect(result).toEqual(orders)
        });

        it('should return an empty array if the user does not have any orders', () => {
            // Given I have a user without any orders
            const userId = 9999;

            // When I call the getUsersOrders method
            const result = orderService.getUserOrders(userId)

            // Then I should get back an empty array
            expect(result).toEqual([])
        })
    })
})
