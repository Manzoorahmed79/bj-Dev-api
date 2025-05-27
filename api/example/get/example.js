const fetch = require('node-fetch'); // Add only if you're using Node.js

const meta = {
  name: "example",
  version: "1.0.0",
  description: "A simple example API that demonstrates basic functionality by Bj tricks",
  author: "bj tricks",
  method: "get",
  category: "example",
  path: "https://bj-veniceai.ma-coder-x.workers.dev/?q="
};

async function onStart({ res, req }) {
  const { text } = req.query;

  if (!text) {
    return res.status(400).json({
      success: false,
      error: "Text parameter is required",
      description: meta.description
    });
  }

  try {
    const apiUrl = `${meta.path}${encodeURIComponent(text)}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      // Show your error format if API fails
      return res.status(response.status).json({
        success: false,
        error: `HTTP error! status: ${response.status}`,
        description: meta.description
      });
    }

    const result = await response.json();
    return res.json(result); // Return your API response as-is
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Internal server error",
      message: err.message,
      description: meta.description
    });
  }
}

module.exports = { meta, onStart };
