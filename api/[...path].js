// api/[...path].js
export default async function handler(req, res) {
  const API_BASE = process.env.RENDER_API_URL; // https://task-management-app-nzra.onrender.com
  if (!API_BASE) return res.status(500).json({ error: 'RENDER_API_URL is not set' });

  const segments = Array.isArray(req.query.path)
    ? req.query.path
    : [req.query.path].filter(Boolean);
  const qs = req.url && req.url.includes('?') ? `?${req.url.split('?')[1]}` : '';
  const url = `${API_BASE}/${(segments || []).join('/')}${qs}`;

  const method = req.method || 'GET';
  const isBodyMethod = !['GET', 'HEAD'].includes(method);
  const body = isBodyMethod
    ? typeof req.body === 'string'
      ? req.body
      : req.body
      ? JSON.stringify(req.body)
      : undefined
    : undefined;

  const { host, 'accept-encoding': _ae, 'content-length': _cl, ...forwardHeaders } = req.headers;

  const r = await fetch(url, { method, headers: forwardHeaders, body });
  res.status(r.status);
  r.headers.forEach((v, k) => res.setHeader(k, v));
  const buf = Buffer.from(await r.arrayBuffer());
  res.send(buf);
}
