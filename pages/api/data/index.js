import connectDb from '@/utils/connectDb';
import User from '@/models/User';

export default async function handler(req, res) {
  // connect to db
  await connectDb();

  switch (req.method) {
    case 'POST':
      const { name } = req.body;
      if (name && name.length >= 3) {
        // const user = new User({ name });
        // await user.save();

        const user = await User.create({ name });
        res
          .status(201)
          .json({ status: 'success', message: 'data created', data: user });
      } else {
        res.status(422).json({ status: 'failed', message: 'unvalid data' });
      }
      break;
  }
}
