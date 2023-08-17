const OrderService = require("./OrderService");
const UserService = require("./UserService");
const DiscountService = require("./DiscountService");

// mock
jest.mock("./UserService");
jest.mock("./DiscountService");

// initialize some fake orders
const initialOrders = [
  {
    id: 1,
    userId: 1,
    items: [
      { name: "Pizza", price: 10 },
      { name: "Cheesburger", price: 15 },
    ],
    totalAmount: 25,
    discountedAmount: 25,
  },
  {
    id: 2,
    userId: 1,
    items: [
      { name: "Paprika", price: 2 },
      { name: "Tomato", price: 5 },
    ],
    totalAmount: 7,
    discountedAmount: 0,
  },
];

// tests for the OrderService
describe("OrderService tests", () => {
  let service;

  // initialize the service and set a few fake items
  beforeEach(() => {
    service = OrderService;
    service.orders = initialOrders;
  });

  // test whether the service can return the user's orders
  it("should return the users orders", () => {
    const result = service.getUserOrders(1);
    expect(result).toEqual(initialOrders);
  });

  // test whether the service returns an empty array when order with a user id doesnt exist yet
  it("should return an empty array", () => {
    const result = service.getUserOrders(3343);
    expect(result).toEqual([]);
  });

  // should throw an error
  it("should throw an error", () => {
    UserService.getUserById.mockReturnValue(null);
    expect(() => service.placeOrder(1, [])).toThrow();
  });

  // test whether the service can place an order
  it("should place an order", () => {
    // mock the getUserById
    UserService.getUserById.mockReturnValue({ id: 2, name: "Oliver" });

    // mock the getUserDiscount
    DiscountService.getUserDiscount.mockReturnValue(0);

    // random items
    const items = [
      { name: "IPhone", price: 500 },
      { name: "Android", price: 600 },
    ];

    const result = service.placeOrder(1, items);
    expect(result).toEqual({
      id: 3,
      userId: 1,
      items: items,
      totalAmount: 1100,
      discountedAmount: 1100,
    });
  });

  // test whether the service can place an order
  it("should place an order with discount", () => {
    // mock the getUserById
    UserService.getUserById.mockReturnValue({ id: 2, name: "Oliver" });

    // mock the getUserDiscount
    DiscountService.getUserDiscount.mockReturnValue(50);

    // random items
    const items = [
      { name: "IPhone", price: 500 },
      { name: "Android", price: 600 },
    ];

    const result = service.placeOrder(1, items);
    expect(result).toEqual({
      id: 4,
      userId: 1,
      items: items,
      totalAmount: 1100,
      discountedAmount: 550,
    });
  });
});
