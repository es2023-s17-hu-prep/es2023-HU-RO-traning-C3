const userService = require('./UserService');
const discountService = require('./DiscountService');
const orderService = require('./OrderService');

// Mock the dependencies
jest.mock('./DiscountService')
jest.mock('./UserService')

/**
 * Tests for the order service class
 */
describe('Order Service', function () {
    /**
     * Reset state between tests
     */
    beforeEach(function () {
        orderService.orders = [];
    });

    /**
     * Tests for the placeOrder method
     */
    describe('placeOrder', function () {
        it('should throw an error if the user is not found', function (){
            // Given a user is not found
            userService.getUserById.mockReturnValue(null);

            // When I call the place order method
            const call = () => orderService.placeOrder(1, []);

            // Then it should throw an error
            expect(call).toThrow('User not found');
        });

        it('should place orders', function () {
            // Given I have the details of an order
            userService.getUserById.mockReturnValue({name: "Test"});
            discountService.getUserDiscount.mockReturnValue(0);
            const userId = 1;
            const items = [{price: 100}, {price: 200}, {price: 300}];

            // When I call the place order method
            const order = orderService.placeOrder(userId, items);

            // Then I should get back the details of the order
            expect(order.userId).toBe(userId);
            expect(order.items).toBe(items);
            expect(order.totalAmount).toBe(600);
            expect(order.discountedAmount).toBe(600);
        });

        it('should calculate discounts', function () {
            // Given I have the details of an order and a discount
            userService.getUserById.mockReturnValue({name: "Test"});
            discountService.getUserDiscount.mockReturnValue(50);
            const userId = 1;
            const items = [{price: 100}, {price: 200}, {price: 300}];

            // When I call the place order method
            const order = orderService.placeOrder(userId, items);

            // Then I should get back the details of the order
            expect(order.totalAmount).toBe(600);
            expect(order.discountedAmount).toBe(300);
        });
    });

    /**
     * Tests for the getUserOrders method
     */
    describe('getUserOrders', function () {
        it('should find orders', function () {
            // Given I have an order
            userService.getUserById.mockReturnValue({name: "Test"});
            discountService.getUserDiscount.mockReturnValue(50);
            const userId = 1;
            const items = [{price: 100}, {price: 200}, {price: 300}];
            orderService.placeOrder(userId, items);

            // When I call the getUserOrders method
            const orders = orderService.getUserOrders(userId);

            // Then I should get the orders of the user
            expect(orders).toEqual([{userId, items, totalAmount: 600, discountedAmount: 300, id: 1}]);
        });

        it('should return an empty array if the user has no orders', function () {
            // Given I have a user without orders
            const userId = 9999;

            // When I call the getUserOrders method
            const orders = orderService.getUserOrders(userId);

            // Then I should get back an empty array
            expect(orders).toEqual([]);
        });
    });
});