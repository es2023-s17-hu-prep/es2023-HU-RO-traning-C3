const OrderService = require("./OrderService");

jest.mock("./UserService", () => ({
    getUserById: jest.fn((userId) => {
        if (userId === -1)
            return null;
        return { id: userId }
    })
}));

const discount = 75;
jest.mock("./DiscountService", () => ({
    getUserDiscount: () => discount
}));

describe("OrderService", () => {
    beforeEach(() => {
        OrderService.orders = [];
    });

    it ("should place an order", () => {
        const userId = Math.floor(Math.random() * 100);
        const items = [
            { price: Math.random() * 500 },
            { price: Math.random() * 500 },
            { price: Math.random() * 500 },
            { price: Math.random() * 500 }
        ];
        const totalAmount = items.reduce((acc, item) => acc + item.price, 0);
        const order = OrderService.placeOrder(userId, items);

        expect(order.id).toBe(1);
        expect(order.userId).toBe(userId);
        expect(order.items).toBe(items);
        expect(order.totalAmount).toBe(totalAmount);
        expect(order.discountedAmount).toBe(totalAmount * (1 - discount / 100));

        expect(OrderService.getUserOrders(userId)).toStrictEqual([order]);
    });

    it("should throw exception if the user doesn't exist", () => {
        const items = [
            { price: Math.random() * 500 },
            { price: Math.random() * 500 },
            { price: Math.random() * 500 },
            { price: Math.random() * 500 }
        ];

        expect(() => OrderService.placeOrder(-1, items))
            .toThrow("User not found");
    });
});