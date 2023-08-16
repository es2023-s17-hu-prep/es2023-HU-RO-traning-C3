const UserService = require("./UserService");
const DiscountService = require("./DiscountService");

class OrderService {
  constructor() {
    this.orders = [];
  }

  placeOrder(userId, items) {
    const user = UserService.getUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const discountPercentage = DiscountService.getUserDiscount(userId);
    const totalAmount = items.reduce((acc, item) => acc + item.price, 0);
    const discountedAmount = totalAmount * (1 - discountPercentage / 100);

    const order = {
      id: this.orders.length + 1,
      userId,
      items,
      totalAmount,
      discountedAmount,
    };

    this.orders.push(order);
    return order;
  }

  getUserOrders(userId) {
    return this.orders.filter((order) => order.userId === userId);
  }
}
module.exports = new OrderService();
