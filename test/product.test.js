import chai from "chai";
import chaiHttp from "chai-http";
import server from "../src/index";

import Category from "../src/models/category";
import Product from "../src/models/product";
import logger from "../src/middleware/logger";

chai.should();
chai.use(chaiHttp);
let product00;
describe("PRODUCTS ROUTES", () => {
  before(async () => {
    try {
      await Category.sync({ force: true });
      await Product.sync({ force: true });
      await Category.create({ name: "cat01" });
      await Category.create({ name: "cat02" });

      const newPorduct = {
        name: "product00",
        price: 100,
        category: ["cat01", "cat02"],
        images: ["./test/400.png"],
      };
      product00 = await Product.create(newPorduct);
    } catch (error) {
      logger.error(error);
    }
  });
  describe("GET /products", () => {
    it("should be all good", (done) => {
      chai
        .request(server)
        .get("/products")
        .end((error, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a("array");
          done();
        });
    });
  });
  describe("GET /product", () => {
    it("should get a single product", (done) => {
      chai
        .request(server)
        .get(`/products/${product00.id}`)
        .end((error, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a("object");
          done();
        });
    });
    it("should not get any product", (done) => {
      chai
        .request(server)
        .get(`/products/boo`)
        .end((error, res) => {
          res.should.have.status(500);
          res.should.be.json;
          res.body.should.be.a("object");
          done();
        });
    });
  });

  describe("POST /products", () => {
    it("should fail to create product", (done) => {
      chai
        .request(server)
        .post("/products")
        .send({})
        .end((error, res) => {
          res.should.have.status(500);
          done();
        });
    });

    it("should fail to create product, no category", (done) => {
      chai
        .request(server)
        .post("/products")
        .field("Content-Type", "multipart/form-data")
        .field({ name: "product01", price: 15 })
        .attach("images", "./test/400.png")
        .end((error, res) => {
          res.should.have.status(500);
          done();
        });
    });

    it("should create new product", (done) => {
      chai
        .request(server)
        .post("/products")
        .field("Content-Type", "multipart/form-data")
        .field({ name: "product01", price: 15, category: ["cat01", "cat02"] })
        .attach("images", "./test/400.png")
        .end((error, res) => {
          res.should.have.status(201);
          done();
        });
    });
  });

  describe("DELETE /products", () => {
    it("should fail to delete", (done) => {
      chai
        .request(server)
        .delete("/products/boo")
        .end((error, res) => {
          res.should.have.status(500);
          done();
        });
    });
    it("should delete a product", (done) => {
      chai
        .request(server)
        .delete(`/products/${product00.id}`)
        .end((error, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
