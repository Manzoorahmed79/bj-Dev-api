const fetch = require('node-fetch'); // Required in Node.js

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
    const url = `${meta.path}${encodeURIComponent(text)}`;
    console.log("➡️ Fetching URL:", url); // Debug log

    const fetchRes = await fetch(url);

    if (!fetchRes.ok) {
      throw new Error(`HTTP error! status: ${fetchRes.status}`);
    }

    const data = await fetchRes.json();
    console.log("✅ API Response:", data); // Debug log

    return res.json(data);
  } catch (err) {
    console.error("❌ Fetch failed:", err.message); // Debug log

    return res.status(500).json({
      success: false,
      error: 'API request failed',
      message: err.message
    });
  }
}

module.exports = { meta, onStart };
