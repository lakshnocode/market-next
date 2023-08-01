const request = require('supertest');
import app from '../recent';

describe('Recent API', () => {
  test('should return announcements from the last two days', async () => {
    const response = await request(app).get('/api/recent');
    expect(response.status).toBe(200);
    // Add more assertions based on the expected announcements from the last two days
  });

  // Add more test cases for different scenarios, edge cases, and error handling
});
