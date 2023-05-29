export default function handler(req, res) {
  const method = req.method;

  switch (method) {
    case 'GET': {
      res.status(200).json('GET 처리 완료');
      break;
    }
    case 'POST': {
      res.status(200).json('POST 처리 완료');
      break;
    }
  }
}
