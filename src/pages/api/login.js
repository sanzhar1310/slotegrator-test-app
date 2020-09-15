import { v4 } from 'uuid';

const TEST_USERNAME = 'Admin';
const TEST_PASSWORD = '12345';


export default (req, res) => {
  if (req.method === 'POST') {
    const { username, password } = req.body;
    if (username === TEST_USERNAME && password === TEST_PASSWORD) {
      res.status(200).send({ token: v4 });
    } else {
      res.status(401).send('try again!');
    }
  } else {
    res.status(404).send('not found');
  }
};
