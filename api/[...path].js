// api/[...path].js
export const config = { api: { bodyParser: false } };

// Vercel Node 18 có fetch sẵn
export default async function handler(req, res) {
  try {
    const segments = Array.isArray(req.query.path) ? req.query.path : [];
    const qs = req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : '';
    const origin = process.env.RENDER_API_URL; // https://task-management-app-nzra.onrender.com
    const url = `${origin}/${segments.join('/')}${qs}`;

    // lấy raw body cho các method không phải GET/HEAD
    let body;
    if (!['GET', 'HEAD'].includes(req.method)) {
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      const buf = Buffer.concat(chunks);
      body = buf.length ? buf : undefined;
    }

    const upstream = await fetch(url, {
      method: req.method,
      headers: {
        // forward 1 số header cơ bản
        'content-type': req.headers['content-type'] || undefined,
        accept: req.headers['accept'] || '*/*',
      },
      body,
    });

    // forward status + headers + body
    res.status(upstream.status);
    upstream.headers.forEach((v, k) => res.setHeader(k, v));
    const ab = await upstream.arrayBuffer();
    res.send(Buffer.from(ab));
  } catch (e) {
    console.error(e);
    res.status(502).json({ message: 'Proxy error', detail: String(e) });
  }
}
