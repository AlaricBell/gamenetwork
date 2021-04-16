import connect from '../database/dbConnect';
import UserHistory from '../models/UserHistory';

export async function getAllAdminHistoryData() {
  connect();
  const userHisotries = await UserHistory.find({});
  return JSON.stringify(userHisotries.map(history => {
      return {message: history.message,
              createdAt: history.createdAt}}));
}