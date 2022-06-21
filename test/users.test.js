import chai from "chai";
import chaiHttp from "chai-http";
import server from "../src/index";
import logger from "../src/middleware/logger";
import User from "../src/models/User";

chai.should();
chai.use(chaiHttp);

let user00;
describe("USERS ROUTES", () => {
  before(async () => {
    try {
      await User.sync({ force: true });
      const userDetails = {
        username: "test00",
        email: "test00@gmail.com",
        profileImage: "./test/400.png",
        role: "USER",
      };
      user00 = await User.create(userDetails);
    } catch (error) {
      logger.error(error);
    }
  });

  describe("GET /users", () => {
    it("should get a list of users", (done) => {
      chai
        .request(server)
        .get("/users")
        .end((error, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  describe("POST /users", () => {
    it("should login a old user", (done) => {
      const userDetails = {
        username: "test00",
        email: "test00@gmail.com",
        profileImage: "./test/400.png",
        role: "USER",
      };
      chai
        .request(server)
        .post("/users/login")
        .send(userDetails)
        .end((error, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it("should login a new user", (done) => {
      const userDetails = {
        username: "test",
        email: "test@gmail.com",
        profileImage: "./test/400.png",
        role: "USER",
      };
      chai
        .request(server)
        .post("/users/login")
        .send(userDetails)
        .end((error, res) => {
          res.should.have.status(201);
          done();
        });
    });
  });

  describe("DELETE /users/:ID", () => {
    it("should fail to delete users", (done) => {
      chai
        .request(server)
        .delete("/users/boo")
        .end((error, res) => {
          res.should.have.status(500);
          done();
        });
    });
    it("should delete user", (done) => {
      chai
        .request(server)
        .delete(`/users/${user00.id}`)
        .end((error, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
