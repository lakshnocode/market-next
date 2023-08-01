const request = require('supertest');
const app = require('../company').default;

describe('GET /api/company', () => {
  it('should return the expected data for SCRIP_CD 532285', async () => {
    const response = await request(app).get('/api/company?SCRIP_CD=532285');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        SCRIP_CD: 532285,
        NEWSID: "d3d3c02b-453b-4555-86e0-a02609b39c77",
        NEWSSUB: "Geojit Financial Services Ltd - 532285 - Announcement under Regulation 30 (LODR)-Investor Presentation"
      }
    ]);
  });
});
