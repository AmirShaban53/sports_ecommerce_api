import chai from "chai";
import chaiHttp from "chai-http";
import server from "../src/index";

import logger from "../src/middleware/logger";
import Product from "../src/models/product";
import User from "../src/models/User";
import Category from "../src/models/category";
import CartItem from "../src/models/cartItem";

chai.should();
chai.use(chaiHttp);

let user00;
let product00;
let cartItem00;
describe("CART ROUTES", () => {
  before(async () => {
    try {
      await User.sync({ force: true });
      await Category.sync({ force: true });
      await Product.sync({ force: true });
      await CartItem.sync({ force: true });

      await Category.create({ name: "cat01" });
      await Category.create({ name: "cat02" });

      const newPorduct = {
        name: "product00",
        price: 100,
        category: ["cat01", "cat02"],
        images: ["./test/400.png"],
      };
      product00 = await Product.create(newPorduct);

      const newCartItem = {
        name: product00.name,
        price: product00.price,
        quantity: 1,
        image: product00.images[0],
        productId: product00.id,
      };

      user00 = await User.create({ email: "test@gmail.com", username: "test" });
      cartItem00 = await user00.createCartItem(newCartItem);
    } catch (error) {
      logger.error(error);
    }
  });
  describe("GET /cart", () => {
    it("should fail to get cartItems", (done) => {
      chai
        .request(server)
        .get("/cart")
        .end((error, res) => {
          res.should.have.status(500);
          done();
        });
    });
    it("should get a list of cartItems", (done) => {
      chai
        .request(server)
        .get("/cart")
        .set("useremail", "test@gmail.com")
        .end((error, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe("POST /cart", () => {
    it("should not create cartitem", (done) => {
      chai
        .request(server)
        .post("/cart")
        .end((error, res) => {
          res.should.have.status(500);
          done();
        });
    });
    it("should create cartitem", (done) => {
      chai
        .request(server)
        .post("/cart")
        .set("useremail", "test@gmail.com")
        .send({ product: product00 })
        .end((error, res) => {
          res.should.have.status(201);
          done();
        });
    });
  });

  describe("DELETE /cart", () => {
    it("should delete cartitem", (done) => {
      chai
        .request(server)
        .delete(`/cart/${cartItem00.id}`)
        .end((error, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it("should fail to delete", (done) => {
      chai
        .request(server)
        .delete("/cart/boo")
        .end((error, res) => {
          res.should.have.status(500);
          done();
        });
    });
  });
});
