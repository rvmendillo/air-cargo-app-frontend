import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { url, method, body, headers } = req;

  // 1. Determine the Target Domain based on the incoming path
  let targetBase = '';
  let targetPath = url || '';

  if (url?.startsWith('/token')) {
    targetBase = 'https://champ-onerecord.germanywestcentral.cloudapp.azure.com/auth/realms/onerecord/protocol/openid-connect';
    targetPath = ''; // The /token is the endpoint itself
  } else if (url?.startsWith('/api/AIR_CARGO_RANGERS')) {
    targetBase = 'https://champ-onerecord.germanywestcentral.cloudapp.azure.com';
  } else if (url?.startsWith('/api-b/inbound-message')) {
    targetBase = 'https://champ-onerecord.germanywestcentral.cloudapp.azure.com';
  } else if (url?.startsWith('/api/v1') || url?.startsWith('/oauth2/token')) {
    targetBase = 'https://qa-dgautocheck.iata.org';
  }

  const destination = `${targetBase}${targetPath}`;
  const targetUrl = new URL(destination);

  try {
    // 2. Mirror the request to the backend
    const response = await fetch(destination, {
      method,
      headers: {
        'Content-Type': headers['content-type'] || 'application/json',
        'Authorization': headers['authorization'] || '',
        'Host': targetUrl.host, // THIS FORCES THE HOST HEADER TO MATCH AZURE/IATA
      },
      // Only include body for POST/PUT/PATCH
      body: ['POST', 'PUT', 'PATCH'].includes(method || '') ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();
    
    // 3. Send the backend response back to Angular
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Proxy Error', details: error.message });
  }
}
