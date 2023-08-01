// data-processing/models/AnnouncementsModel.js

import mongoose from 'mongoose';

// Define the Mongoose schema for the announcements data
const announcementsSchema = new mongoose.Schema({
  NEWSID: { type: String, required: true },
  SCRIP_CD: { type: Number, required: true },
  XML_NAME: String,
  NEWSSUB: String,
  DT_TM: String,
  NEWS_DT: String,
  CRITICALNEWS: Number,
  ANNOUNCEMENT_TYPE: String,
  QUARTER_ID: String,
  FILESTATUS: String,
  ATTACHMENTNAME: String,
  MORE: String,
  HEADLINE: String,
  CATEGORYNAME: String,
  OLD: Number,
  RN: Number,
  PDFFLAG: Number,
  NSURL: String,
  SLONGNAME: String,
  AGENDA_ID: Number,
  TotalPageCnt: Number,
  News_submission_dt: String,
  DissemDT: String,
  TimeDiff: String,
  Fld_Attachsize: Number,
  SUBCATNAME: String,
  AUDIO_VIDEO_FILE: String,
});

// Check if the model is already defined
const AnnouncementsModel = mongoose.models.announcements || mongoose.model('announcements', announcementsSchema);

export default AnnouncementsModel;