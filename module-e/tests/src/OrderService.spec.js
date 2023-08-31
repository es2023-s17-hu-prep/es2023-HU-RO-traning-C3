const OrderService = require("./OrderService");
const UserService = require("./UserService");
const DiscountService = require("./DiscountService");

// mock
jest.mock("./UserService");
jest.mock("./DiscountService");

/**
 * Tests for the order service
 */
describe("OrderService tests", () => {
  let service;

  /**
   * Create a new service every time
   */
  beforeEach(() => {
    service = OrderService;
    service.orders = [];
  });

  /**
   * Test should return the user orders
   */
  it("should return the user orders", () => {
    // given
    const orders = [
      {
        userId: "2",
        items: [],
      },
      {
        userId: "2",
        items: [],
      },
    ];
    service.orders = orders;

    // when
    const result = service.getUserOrders("2");

    // then
    expect(result).toEqual(orders);
  });

  /**
   * Test should throw an error because user not found
   */
  it("should throw an error because user not found", () => {
    // given
    UserService.getUserById.mockReturnValue(undefined);

    // when, then
    expect(() => service.placeOrder("1", [])).toThrow("User not found");
  });

  /**
   * Test should place the order with the correct values
   */
  it("should place the order with the correct values", () => {
    // given
    DiscountService.getUserDiscount.mockReturnValue(10);
    UserService.getUserById.mockReturnValue({ userId: "1" });
    const items = [{ price: 100 }, { price: 200 }];
    const expected = {
      id: 1,
      userId: "1",
      items,
      totalAmount: 300,
      discountedAmount: 270,
    };

    // when
    const res = service.placeOrder("1", items);

    // then
    expect(res).toEqual(expected);
  });
});
