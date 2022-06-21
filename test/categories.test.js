import chai from "chai";
import chaiHttp from "chai-http";
import server from "../src/index";
import Category from "../src/models/category";
import logger from "../src/middleware/logger";

chai.should();
chai.use(chaiHttp);

describe("CATEGORIES ROUTES", () => {
  before(async () => {
    try {
      await Category.sync({ force: true });
    } catch (error) {
      logger.error(error);
    }
  });
  describe("GET /categories", () => {
    it("should get list of categories", (done) => {
      chai
        .request(server)
        .get("/categories")
        .end((error, res) => {
          res.should.have.a.status(200);
          done();
        });
    });
  });

  describe("POST /categories", () => {
    it("should create a new category", (done) => {
      const newcat = { category: "cat00" };
      chai
        .request(server)
        .post("/categories")
        .send(newcat)
        .end((error, res) => {
          res.should.have.a.status(200);
          done();
        });
    });

    it("should fail to create category", (done) => {
      chai
        .request(server)
        .post("/categories")
        .send({})
        .end((error, res) => {
          res.should.have.a.status(500);
          done();
        });
    });
  });

  describe("DELETE /categories", () => {
    it("should delete a category", (done) => {
      chai
        .request(server)
        .delete("/categories")
        .end((error, res) => {
          res.should.have.a.status(200);
          done();
        });
    });
  });
});
