import connectDb from '@/utils/connectDb';
import User from '@/models/User';

export default async function handler(req, res) {
  try {
    // connect to db
    await connectDb();
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ status: 'failed', message: 'failed to connect to db' });
  }

  switch (req.method) {
    case 'POST':
      const { name } = req.body;
      if (name && name.length >= 3) {
        // const user = new User({ name });
        // await user.save();
        try {
          const user = await User.create({
            name,
            age: 23,
            email: 'mh.jf@gmail.com',
          });
          res
            .status(201)
            .json({ status: 'success', message: 'data created', data: user });
        } catch (error) {
          console.log(error);
          res
            .status(500)
            .json({ status: 'failed', message: 'failed to create user' });
        }
      } else {
        res.status(422).json({ status: 'failed', message: 'unvalid data' });
      }
      break;
  }
}
