const discountService = require("./DiscountService");
const userService = require("./UserService");

const orderService = require("./OrderService");

describe("DiscoutService", function () {
  discountService.userDiscounts = [
    { userId: 1, discountPercentage: 10 },
    { userId: 2, discountPercentage: 20 },
    { userId: 3, discountPercentage: 30 },
    { userId: 4, discountPercentage: 40 },
  ];
  describe("getUserDiscount", function () {
    it("retrieves the user discount based on the id", function () {
      expect(discountService.getUserDiscount(1)).toBe(10);
      expect(discountService.getUserDiscount(2)).toBe(20);
    });

    it("returns 0 if the discount is not found", function () {
      expect(discountService.getUserDiscount("sometthing random")).toBe(0);
    });
  });

  describe("setUserDiscount", function () {
    it("pushes a new discount to the service", function () {
      var lengthBefore = discountService.userDiscounts.length;
      var newDiscount = { userId: 5, discountPercentage: 50 };
      discountService.setUserDiscount(
        newDiscount.userId,
        newDiscount.discountPercentage
      );
      expect(discountService.userDiscounts.length).toBe(lengthBefore + 1);
      expect(
        discountService.userDiscounts[discountService.userDiscounts.length - 1]
      ).toStrictEqual(newDiscount);
    });
  });
});

describe("UserService", function () {
  describe("addUser", () => {
    it("adds a new user with the proper id", function () {
      userService.addUser({ name: "John" });
      userService.addUser({ name: "Mark" });
      expect(userService.users[0]).toStrictEqual({
        name: "John",
        id: 1,
      });
    });
  });

  describe("getUserById", () => {
    it("retrieves the right user based on the id", function () {
      expect(userService.getUserById(1)).toStrictEqual({
        name: "John",
        id: 1,
      });

      expect(userService.getUserById(2)).toStrictEqual({
        name: "Mark",
        id: 2,
      });
    });
    
    it("returns nothing when the user is not found", function () {
      expect(userService.getUserById(20)).toBe(undefined);
    });
  });
});

describe("OrderService", function () {
  const users = [{ name: "Bob" }];
  const resp = { data: users };

  jest.mock("./DiscountService", () => ({
    getUserDiscount: (id) => {
      if (id == 1) return 10;
      if (id == 2) return 20;
      return 0;
    },
  }));
  jest.mock("./UserService", () => ({
    getUserById: (id) => {
      if (id == 1) {
        return {
          name: "John",
          id: 1,
        };
      }
      if (id == 2) {
        return {
          name: "Mark",
          id: 2,
        };
      }
      return false;
    },
  }));

  describe("placeOrder", () => {
    it("places an order", function () {
      expect(orderService.placeOrder(1, [{ price: 10 }])).toStrictEqual({
        id: 1,
        userId: 1,
        items: [{ price: 10 }],
        totalAmount: 10,
        discountedAmount: 9,
      });
    });

    it("fails when the user is not found", function () {
      expect(() => orderService.placeOrder(6, undefined)).toThrow();
    });
  });
  describe("getUserOrders", () => {
    it("retrieves the orders of the user", function () {
      orderService.getUserOrders(1);
    });
  });
});
