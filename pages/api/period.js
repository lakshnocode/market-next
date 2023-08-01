// pages/api/period.js

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
            const { startDate, endDate } = query;

            // Log the received startDate and endDate for debugging
            console.log('Received startDate:', startDate);
            console.log('Received endDate:', endDate);

            // Validate the query parameters startDate and endDate
            if (!startDate || !endDate) {
                return res.status(400).json({ error: 'Missing start date or end date.' });
            }

            const modstartDateObj = startDate + "T00:00:00.00"
            const modendDateObj = endDate + "T00:00:00.00"

            // console.log('modified dates:', modstartDateObj);

            // Find announcements with News_submission_dt between startDate and endDate
            const announcements = await AnnouncementsModel.find({
                NEWS_DT: { $gte: modstartDateObj, $lte: modendDateObj },
            });

            // Log the fetched announcements for debugging
            // console.log('Fetched announcements:', announcements);

            // Extract and return the desired fields for each announcement
            const response = announcements.map(({ SCRIP_CD, NEWSID, SLONGNAME, NEWSSUB }) => ({
                SCRIP_CD,
                NEWSID,
                SLONGNAME,
                NEWSSUB
            }));

            return res.status(200).json(response);
        } catch (error) {
            console.error('Error fetching announcements by period:', error);
            return res.status(500).json({ error: 'Internal Server Error.' });
        }
    }

    // Handle other request methods
    return res.status(405).json({ error: 'Method not allowed.' });
}