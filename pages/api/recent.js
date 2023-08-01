import connectDB from '../../data-processing/db';
import AnnouncementsModel from '../../data-processing/models/AnnouncementModel';

export default async function handler(req, res) {
  const { method } = req;

  // Connect to the MongoDB database
  await connectDB();

  // Check if the request method is GET
  if (method === 'GET') {
    try {
      // Calculate the date range for the last two days
      const endDate = new Date();
      const startDate = new Date(endDate);
      startDate.setDate(startDate.getDate() - 2);

      endDate.setMonth(endDate.getMonth() + 1)
      startDate.setMonth(startDate.getMonth() + 1)

      // Data Manipulation 
      const modEndDate = endDate.getFullYear() + "-0" + endDate.getMonth() + "-" + endDate.getDate() + "T00:00:00.000";
      const modStartDate = startDate.getFullYear() + "-0" + startDate.getMonth() + "-" + startDate.getDate() + "T00:00:00.000";

      // console.log("Start Date :" , modStartDate)
      // console.log("End Date :" , modEndDate)

      // Find announcements with NEWS_DT between startDate and endDate
      const announcements = await AnnouncementsModel.find({
        NEWS_DT: { $gte: modStartDate, $lte: modEndDate },
    }).sort({ NEWS_DT: -1 });

      // Extract and return the desired fields for each announcement
      const response = announcements.map(({ SCRIP_CD, NEWSID, NEWSSUB, NEWS_DT }) => ({
        SCRIP_CD,
        NEWSID,
        NEWSSUB,
        NEWS_DT
      }));

      return res.status(200).json(response);
    } catch (error) {
      console.error('Error fetching recent announcements:', error);
      return res.status(500).json({ error: 'Internal Server Error.' });
    }
  }

  // Handle other request methods
  return res.status(405).json({ error: 'Method not allowed.' });
}