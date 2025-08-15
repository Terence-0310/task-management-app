// api/[...path].js

export default async function handler(req, res) {
  const API_BASE = process.env.RENDER_API_URL; // ví dụ: https://task-management-app-nzra.onrender.com

  if (!API_BASE) {
    return res.status(500).json({ error: 'RENDER_API_URL is not set' });
  }

  // Ghép path + query gốc
  const segments = Array.isArray(req.query.path) ? req.query.path : [];
  const qs = req.url.includes('?') ? `?${req.url.split('?')[1]}` : '';
  const url = `${API_BASE}/${segments.join('/')}${qs}`;

  try {
    const init = { method: req.method, headers: {} };

    // Forward body cho các method không phải GET/HEAD
    if (!['GET', 'HEAD'].includes(req.method)) {
      init.headers['Content-Type'] = 'application/json';
      init.body = JSON.stringify(req.body || {});
    }

    const r = await fetch(url, init);
    const text = await r.text();

    // forward status + content-type
    res.status(r.status);
    const ct = r.headers.get('content-type') || '';
    if (ct) res.setHeader('Content-Type', ct);
    res.send(text);
  } catch (err) {
    res.status(502).json({ error: String(err) });
  }
}
