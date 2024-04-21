import User from '@/models/User';
import connectDb from '@/utils/connectDb';

export default async function handler(req, res) {
  try {
    await connectDb();
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: 'failed', message: 'failed to connect to db' });
    return;
  }

  const { id } = req.query;

  switch (req.method) {
    case 'GET':
      try {
        const user = await User.findById(id);
        if (user) {
          res.status(200).json({ status: 'success', user });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'cant get user data' });
      }
  }
}
