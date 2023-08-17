const UserService = require("./UserService");
const DiscountService = require("./OrderService");
const OrderService = require("./OrderService");

describe("OrderService", () => {
  
    test("placeOrder() makes array longer when called", ()=> {
        var init_lenght=OrderService.orders.length;
        UserService.addUser({name: 'gica'});
        OrderService.placeOrder(1,['shoes', 'shirts']);      
        var latest_lenght=OrderService.orders.length;
        expect(latest_lenght-init_lenght).toEqual(1);
      });
    test("getUserOrders() should return user orders", ()=>{
        UserService.addUser({name: 'gica 1'});
        OrderService.placeOrder(1,['shoes']);    
        const userOrders = OrderService.getUserOrders(1);
        expect(userOrders.length).toEqual(2);
    });
      
  });