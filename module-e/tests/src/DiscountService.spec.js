const discountService = require('./DiscountService');

/**
 * Tests for the discount service class
 */
describe('Discount Service', function () {
    /**
     * Reset state between tests
     */
    beforeEach(function () {
        discountService.userDiscounts = [];
    });

    /**
     * Tests for the setUserDiscount method
     */
    describe('setUserDiscount', function () {
        it('should set user discounts', function () {
            // Given I have a userId and a discountPercentage
            const userId = 1;
            const discountPercentage = 30;

            // When I call the setUserDiscount
            discountService.setUserDiscount(userId, discountPercentage);

            // Then it should store the discount in the userDiscounts array
            expect(discountService.userDiscounts).toEqual([{userId, discountPercentage}])
        });
    });

    /**
     * Tests for the getUserDiscount method
     */
    describe('getUserDiscount', function () {
        it('should return a users discount', function () {
            // Given I have a discount
            const userId = 1;
            const discountPercentage = 30;
            discountService.setUserDiscount(userId, discountPercentage);

            // When I call the getUserDiscount
            const discount = discountService.getUserDiscount(userId);

            // Then I should get the discount back
            expect(discount).toBe(discountPercentage);
        });

        it('should return 0 if there is no discount for the user', function () {
            // Given I have a user without discounts
            const userId = 9999;

            // When I call the getUserDiscount
            const discount = discountService.getUserDiscount(userId);

            // Then I should get back 0
            expect(discount).toBe(0);
        });
    })
});