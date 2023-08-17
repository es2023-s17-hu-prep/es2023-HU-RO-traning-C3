const DiscountService = require("./DiscountService");


describe("DiscountService", () => {
  
    test("defines setUserDiscount()", () => {
      expect(typeof DiscountService.setUserDiscount).toBe("function");
    });
    test("setUserDiscount() makes array longer when called", () => {
        var init_lenght = DiscountService.userDiscounts.length;
        DiscountService.setUserDiscount('21',10);
        expect(DiscountService.userDiscounts.length = init_lenght+1 ).toEqual(1);
      });
    test("getUserDiscount() finds added user discount", () => {
        DiscountService.setUserDiscount('21',10);
        expect(DiscountService.getUserDiscount(21)).toBe(0);
    });
      
  });