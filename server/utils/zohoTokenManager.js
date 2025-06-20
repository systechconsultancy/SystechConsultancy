import ZohoToken from '../models/ZohoToken.js';
import axios from 'axios';



export async function getAccessToken() {

  const ZOHO_REFRESH_TOKEN = process.env.ZOHO_REFRESH_TOKEN;
  const ZOHO_CLIENT_ID = process.env.ZOHO_CLIENT_ID;
  const ZOHO_CLIENT_SECRET = process.env.ZOHO_CLIENT_SECRET;

  const tokenDoc = await ZohoToken.findOne();

  if (tokenDoc && new Date() < tokenDoc.expires_at) {
    return tokenDoc.access_token;
  }

  const response = await axios.post(`https://accounts.zoho.in/oauth/v2/token`, null, {
    params: {
      refresh_token: ZOHO_REFRESH_TOKEN,
      client_id: ZOHO_CLIENT_ID,
      client_secret: ZOHO_CLIENT_SECRET,
      grant_type: 'refresh_token',
    },
  });


  const { access_token, expires_in } = response.data;
  const date = new Date();
  date.setMinutes(date.getMinutes() + expires_in / 60);
  const expires_at = date;

  if (tokenDoc) {
    tokenDoc.access_token = access_token;
    tokenDoc.expires_at = expires_at;
    await tokenDoc.save();
  } else {
    await ZohoToken.create({ access_token, expires_at });
  }

  return access_token;
}
