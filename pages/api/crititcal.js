// pages/api/critical.js

import connectDB from '../../data-processing/db';
import AnnouncementsModel from '../../data-processing/models/AnnouncementModel';

// Connect to the MongoDB database
connectDB();

// Handles incoming HTTP requests and generates HTTP responses
export default async function handler(req, res) {
  const { method } = req;

  // Check if the request method is GET
  if (method === 'GET') {
    try {
      // Find announcements with CRITICALNEWS > 0
      const criticalAnnouncements = await AnnouncementsModel.find({ CRITICALNEWS: { $gt: 0 } });

      // Extract and return the desired fields for each critical announcement
      const response = criticalAnnouncements.map(({ SCRIP_CD, NEWSID, SLONGNAME, NEWSSUB }) => ({
        SCRIP_CD,
        NEWSID,
        SLONGNAME,
        NEWSSUB
      }));

      return res.status(200).json(response);
    } catch (error) {
      console.error('Error fetching critical announcements:', error);
      return res.status(500).json({ error: 'Internal Server Error.' });
    }
  }

  // Handle other request methods
  return res.status(405).json({ error: 'Method not allowed.' });
}
