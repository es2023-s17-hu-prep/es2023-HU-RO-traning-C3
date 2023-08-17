const DiscountService = require("./DiscountService");

// tests for the DiscountService
describe("DiscountService tests", () => {
  let service;

  // initialize the service and set a few fake items
  beforeAll(() => {
    service = DiscountService;
    service.userDiscounts = [
      { userId: 1, discountPercentage: 10 },
      { userId: 1, discountPercentage: 16 },
      { userId: 2, discountPercentage: 30 },
    ];
  });

  // test whether the service can set a new user discount
  it("should set a new user discount", () => {
    service.setUserDiscount(2, 40);

    expect(service.userDiscounts).toEqual([
      { userId: 1, discountPercentage: 10 },
      { userId: 1, discountPercentage: 16 },
      { userId: 2, discountPercentage: 30 },
      { userId: 2, discountPercentage: 40 },
    ]);
  });

  // test whether the service can return a discount based on user id
  it("should return a discount based on a user id", () => {
    const result = service.getUserDiscount(1);
    expect(result).toEqual(10);
  });

  // the getUserDiscount should return the users' first discount
  it("should not return a discount based on a user id", () => {
    const result = service.getUserDiscount(1);
    expect(result).not.toBe(16); // 16 is the user's second discount, we don't want that
  });

  // test should return 0 because the user with this id doesn't have discount
  it("should return zero", () => {
    const result = service.getUserDiscount(69);
    expect(result).toEqual(0);
  });
});
