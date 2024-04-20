import connectDb from '@/utils/connectDb';

export default async function handler(req, res) {
  // connect to db
  await connectDb();

  switch (req.method) {
    case 'POST':
      const { name } = req.body;
      if (name && name.length >= 3) {
        res
          .status(201)
          .json({ status: 'success', message: 'data created', data: { name } });
      } else {
        res.status(422).json({ status: 'failed', message: 'unvalid data' });
      }
      break;
  }
}
