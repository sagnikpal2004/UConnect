import { register } from '../server/src/controllers/auth';
import { Request, Response } from 'express';
import pool from '../server/src/database/postgres';
process.env.JWT_SECRET = 'yourTestSecret'


describe("User Registration", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    // Mock request and response objects
    req = {
      body: {
        username: "testuser",
        email: "test@example.com",
        password: "password123"
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
  });

  it("should register a new user and return a token", async () => {
    // Mock the database query if needed (e.g., simulate successful insert)
    const mockQuery = jest.fn().mockResolvedValueOnce({
      rows: [{ id: 1, username: 'testuser', email: 'test@example.com' }]
    });
    
    // Override pool.query with the mock
    (pool.query as jest.Mock) = mockQuery;

    await register(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ token: 'fake-token' });
  });

  it("should return 400 if required fields are missing", async () => {
    req.body = { username: "testuser" };  // Missing email and password

    await register(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Missing fields" });
  });

  it("should return 500 if there's a database error", async () => {
    // Simulate a database error
    const mockQuery = jest.fn().mockRejectedValueOnce(new Error("Database error"));

    (pool.query as jest.Mock) = mockQuery;

    await register(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal Server Error' });
  });
});