const DiscountService = require("./DiscountService");

describe("DiscountService", () => {
    beforeEach(() => {
        DiscountService.userDiscounts = [];
    });

    it("should return a discount right", () => {
        let userId = Math.floor(Math.random() * 100);
        let discount = Math.floor(Math.random() * 100);
        DiscountService.setUserDiscount(userId, discount);
        expect(DiscountService.getUserDiscount(userId)).toBe(discount);
    });

    it("should return 0 if no discount was set", () => {
        let userId = Math.floor(Math.random() * 100);
        expect(DiscountService.getUserDiscount(userId)).toBe(0);
    });

    it("should return updated discount", () => {
        let userId = Math.floor(Math.random() * 100);
        let discount = Math.floor(Math.random() * 100);
        let updatedDiscount = Math.floor(Math.random() * 100);
        while (discount !== updatedDiscount)
            updatedDiscount = Math.floor(Math.random() * 100);
        
        DiscountService.setUserDiscount(userId, discount);
        expect(DiscountService.getUserDiscount(userId)).toBe(discount);
        DiscountService.setUserDiscount(userId, updatedDiscount);
        expect(DiscountService.getUserDiscount(userId)).toBe(updatedDiscount);
    });
});