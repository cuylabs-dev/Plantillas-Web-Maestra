import { head } from "@vercel/blob";

export default async function handler(req, res) {
  const { slug } = req.query;
  if (!slug || typeof slug !== "string") {
    return res.status(400).json({ error: "slug required" });
  }

  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    return res.status(503).json({ error: "BLOB_READ_WRITE_TOKEN not configured" });
  }

  try {
    const pathname = `kits/${slug}.json`;
    const meta = await head(pathname, { token });
    const upstream = await fetch(meta.url);
    if (!upstream.ok) return res.status(404).json({ error: "kit not found" });
    const data = await upstream.json();
    res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
    return res.status(200).json(data);
  } catch {
    return res.status(404).json({ error: "kit not found" });
  }
}
