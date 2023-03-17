import axios from "axios";
import { APIEvent, json } from "solid-start";
import { GITHUB_APP_ID } from "~/lib/constants";

export async function GET({ request }: APIEvent) {
  const params = new URLSearchParams(request.url.split('?')[1])
  const code = params.get('code')    
  const response = await axios.post(
    'https://github.com/login/oauth/access_token', 
    {
      client_id: GITHUB_APP_ID,
      client_secret: process.env.GH_APP_SECRET,
      code,
    },
    // {
    //   headers: {
    //     Accept: "application/json"
    //   }
    // }
  );
  return json(response.data);
}