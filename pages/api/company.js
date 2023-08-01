// pages/api/company.js

import connectDB from '../../data-processing/db';
import AnnouncementsModel from '../../data-processing/models/AnnouncementModel';

// Connect to the MongoDB database
connectDB();

// Handles incoming HTTP requests and generates HTTP responses
export default async function handler(req, res) {
  const { method, query } = req;

  // Check if the request method is GET
  if (method === 'GET') {
    try {
      const { SCRIP_CD } = query;

      // Validate the query parameter SCRIP_CD
      if (!SCRIP_CD || isNaN(Number(SCRIP_CD))) {
        return res.status(400).json({ error: 'Invalid SCRIP_CD parameter.' });
      }

      // Find announcements of the specified company (SCRIP_CD)
      const announcements = await AnnouncementsModel.find({ SCRIP_CD: Number(SCRIP_CD) });

      // Extract and return only the desired fields in the response
      const response = announcements.map(({ SCRIP_CD, NEWSID, NEWSSUB }) => ({
        SCRIP_CD,
        NEWSID,
        NEWSSUB,
      }));

      return res.status(200).json(response);
    } catch (error) {
      console.error('Error fetching announcements:', error);
      return res.status(500).json({ error: 'Internal Server Error.' });
    }
  }

  // Handle other request methods
  return res.status(405).json({ error: 'Method not allowed.' });
}
