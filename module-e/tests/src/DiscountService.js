class DiscountService {
  constructor() {
    this.userDiscounts = [];
  }

  setUserDiscount(userId, discountPercentage) {
    this.userDiscounts.push({ userId, discountPercentage });
  }

  getUserDiscount(userId) {
    const discount = this.userDiscounts.find((d) => d.userId === userId);
    return discount ? discount.discountPercentage : 0;
  }
}

module.exports = new DiscountService();
