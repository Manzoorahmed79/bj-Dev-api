const meta = {
  name: "example",
  version: "1.0.0",
  description: "A simple example API that demonstrates basic functionality",
  author: "bj tricks", 
  method: "get",
  category: "example",
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

    return res.json(data);
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: err.message
    });
  }
}

module.exports = { meta, onStart };
