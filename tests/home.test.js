const supertest = require("supertest");
const app = require("../app");

describe("Home route", () => {
  it("should redirect to the home page", async () => {
    const response = await supertest(app).get("/");

    expect(response.status).toBe(302);
    expect(response.headers.location).toBe("home");
  });
});
