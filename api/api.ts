import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios'
import { GITHUB_APP_ID } from '../src/constants';

export default async function (req: VercelRequest, res: VercelResponse) {
  const { code } = req.query;
  const response = await axios.post('https://github.com/login/oauth/access_token', {
    client_id: GITHUB_APP_ID,
    client_secret: process.env.GH_APP_SECRET,
    code,
  })
  res.send(response.data);
}
