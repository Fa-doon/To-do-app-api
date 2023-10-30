const supertest = require("supertest");
const app = require("../app");
const { connect } = require("./database");

describe("Authentication", () => {
  let connection;
  beforeAll(async () => {
    connection = await connect();
  });

  beforeEach(async () => {
    await connection.cleanup();
  });

  afterAll(async () => {
    await connection.disconnect();
  });

  it("should successfully signup a user", async () => {
    const response = await supertest(app).post("/users/signup").send({
      username: "Sam",
      email: "sam@example.com",
      password: "samsam123",
    });

    expect(response.headers.location).toBe("/login");
  });
});
