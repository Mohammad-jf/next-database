export default function handler(req, res) {
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
