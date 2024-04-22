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
      break;

    case 'PATCH':
      const { email } = req.body;
      try {
        const user = await User.findById(id);
        if (user) {
          user.email = email;
          await user.save();
          res.status(200).json({ status: 'success', user });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'cant update user data' });
      }
      break;

    case 'DELETE':
      try {
        const user = User.findById(id);
        if (user) {
          // await user.deleteOne();
          await User.findOneAndDelete({ _id: id });
        }
        res.status(200).json({ status: 'successfully deleted' });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'failed to delete user data' });
      }
  }
}
