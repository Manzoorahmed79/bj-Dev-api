const meta = {
  name: "example",
  version: "1.0.1",
  description: "AI response API powered by VeniceAI",
  author: "bj tricks", 
  method: "get",
  category: "ai",
  path: "https://bj-veniceai.ma-coder-x.workers.dev/?q="
};

async function onStart({ res, req }) {
  const { text } = req.query;

  if (!text) {
    return res.status(400).json({ 
      status: false, 
      error: 'Text parameter is required' 
    });
  }

  try {
    const fetchRes = await fetch(`${meta.path}${encodeURIComponent(text)}`);
    const data = await fetchRes.json();

    if (!data.success) {
      return res.status(500).json({
        status: false,
        error: 'API returned an error',
        raw: data
      });
    }

    return res.json({
      status: true,
      role: data.role,
      response: data.content,
      timestamp: new Date().toISOString(),
      join: data.join,
      creator: data.Dev
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      error: 'Internal server error',
      details: err.message
    });
  }
}

module.exports = { meta, onStart };
