class DiscountService {
  constructor() {
    this.userDiscounts = [];
  }

  setUserDiscount(userId, discountPercentage) {
    this.userDiscounts.push({ userId, discountPercentage });
    console.log('setUserDiscounts', this.userDiscounts)
  }

  getUserDiscount(userId) {
    const discount = this.userDiscounts.find((d) => d.userId === userId);
    console.log('getUserDiscount', discount)
    return discount ? discount.discountPercentage : 0;
  }
}

module.exports = new DiscountService();
