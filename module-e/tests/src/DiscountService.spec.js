const DiscountService = require("./DiscountService");

/**
 * Tests for the user service
 */
describe("DiscountService tests", () => {
  let service;

  /**
   * Create a new service every time
   */
  beforeEach(() => {
    service = DiscountService;
    service.userDiscounts = [];
  });

  /**
   * Test should set a user discount
   */
  it("should set a user discount", () => {
    // given
    const expected = { userId: 1, discountPercentage: 15 };

    // when
    service.setUserDiscount(expected.userId, expected.discountPercentage);

    // then
    expect(service.userDiscounts).toEqual([expected]);
  });

  /**
   * Test should get a user discount
   */
  it("should get a user discount", () => {
    // given
    const userDiscounts = [{ userId: 1, discountPercentage: 15 }];
    service.userDiscounts = userDiscounts;

    // when
    const result = service.getUserDiscount(1);

    // then
    expect(result).toEqual(userDiscounts[0].discountPercentage);
  });

  /**
   * Test should get 0 as a discount because no user found with the given id
   */
  it("should get 0 as a discount because no user found with the given id", () => {
    // when
    const result = service.getUserDiscount(13223232323);

    // then
    expect(result).toEqual(0);
  });
});
