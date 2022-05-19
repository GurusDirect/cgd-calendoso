import type { NextApiRequest, NextApiResponse } from "next";

export default async function federatedLogout(req: NextApiRequest, res: NextApiResponse) {
  const clientID = process.env.KEYCLOAK_CLIENT_ID;
  const logoutUrl = `${process.env.KEYCLOAK_BASE_URL}/logout`;
  const logoutParams = new URLSearchParams({
    client_id: clientID,
    redirect_uri: process.env.BASE_URL,
  });
  return res.redirect(`${logoutUrl}?${logoutParams}`);
}
