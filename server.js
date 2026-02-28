const express = require("express");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json());
app.use(express.static("public"));

// Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// AI Route
app.post("/ask", async (req, res) => {
  try {
    const question = req.body.question;

    if (!process.env.API_KEY) {
      return res.json({
        error: { message: "API Key missing" }
      });
    }

    const response = await fetch(
`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.API_KEY}`,
{
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    contents: [
      {
        parts: [{ text: question }]
      }
    ]
  })
});

    const data = await response.json();

    console.log("Gemini Response:", data);

    res.json(data);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: { message: "Server Error" }
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
