import mongoose from "mongoose";
import request from "supertest";
import app from "../src/index";

require("dotenv").config();



/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(`${process.env.MONGO_URI}`);
  });
  
  /* Closing database connection after each test. */
  afterEach(async () => {
    await mongoose.connection.close();
  });


  describe("GET /api/v1/image", () => {
    it("should return all images", async () => {
      const res = await request(app).get("/api/v1/image");
      expect(res.statusCode).toBe(200);
      expect(JSON.parse(res.text).success).toEqual(true);
    });
  });