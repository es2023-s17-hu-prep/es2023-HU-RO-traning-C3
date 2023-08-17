const DiscountService = require('../src/DiscountService');

describe('DiscountService', () => {
  
  beforeEach(() => {
    // Clear any user discounts before each test
    DiscountService.userDiscounts = [];
  });

  it('should set and get user discount', () => {
    const userId = 1;
    const discountPercentage = 10;

    DiscountService.setUserDiscount(userId, discountPercentage);

    const receivedDiscount = DiscountService.getUserDiscount(userId);

    expect(receivedDiscount).toBe(discountPercentage);
  });

  it('should return 0 if no discount set for user', () => {
    const userId = 2;

    const receivedDiscount = DiscountService.getUserDiscount(userId);

    expect(receivedDiscount).toBe(0);
  });

});

