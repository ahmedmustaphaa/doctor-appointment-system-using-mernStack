import app from '../index.js';
import { connectDb } from '../Db/ConnectDb.js';

export default async function handler(req, res) {
  // تأكد إن قاعدة البيانات متوصلة قبل أي request
  await connectDb();
  
  // خلي Express يعالج الـ request
  app(req, res);
}