const discountService = require('./DiscountService')

/**
 * Tests for the discount service
 */
describe('Discount Service', () => {
    it('should set discounts', () => {
        // Given I have a discount for the user
        const userId = 1;
        const discountPercentage = 50;
        discountService.setUserDiscount(userId, discountPercentage)

        // When I call the getUserDiscount with the user id
        const discount = discountService.getUserDiscount(userId)

        // Then I should get back the user's discount
        expect(discount).toBe(discountPercentage)
    });

    it('should return 0 when there is no discount set', () => {
        // Given I have a userId which does not have any discounts
        const userId = 9999;

        // When I call the getUserDiscount with that user id
        const discount = discountService.getUserDiscount(userId)

        // Then I should get back 0
        expect(discount).toBe(0)
    })
});