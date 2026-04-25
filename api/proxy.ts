
// api/proxy.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import httpProxy from 'http-proxy';

const proxy = httpProxy.createProxyServer();

export default function handler(req: VercelRequest, res: VercelResponse) {
  return new Promise((resolve, reject) => {
    let target = '';

    // Route logic matching your proxy.conf.json
    if (req.url?.startsWith('/token')) {
      target = 'https://champ-onerecord.germanywestcentral.cloudapp.azure.com/auth/realms/onerecord/protocol/openid-connect';
      // Strip the /token part because the destination above is the full endpoint
      req.url = ''; 
    } else if (req.url?.startsWith('/api/AIR_CARGO_RANGERS')) {
      target = 'https://champ-onerecord.germanywestcentral.cloudapp.azure.com';
    } else if (req.url?.startsWith('/api-b/inbound-message')) {
      target = 'https://champ-onerecord.germanywestcentral.cloudapp.azure.com';
    } else if (req.url?.startsWith('/api/v1') || req.url?.startsWith('/oauth2/token')) {
      target = 'https://qa-dgautocheck.iata.org';
    }

    const targetUrl = new URL(target);
    
    // FORCING CHANGE ORIGIN (The "Magic Fix" for 405/403)
    req.headers.host = targetUrl.host;

    proxy.web(req, res, { 
      target, 
      changeOrigin: true, 
      secure: false 
    }, (err) => {
      if (err) {
        res.status(500).json({ error: 'Proxy Error', message: err.message });
        return resolve(true);
      }
      resolve(true);
    });
  });
}
