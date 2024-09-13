const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

const GNEWS_API_KEY = '6f421a97109f2cb95589428931037bcb';  // Make sure this is your correct API key

// Fetch news articles
app.get('/news', async (req, res) => {
  const searchQuery = req.query.q || 'world';  // Default to 'world' if no query provided
  const page = req.query.page || 1;            // Handle pagination

  const url = `https://gnews.io/api/v4/search?q=${searchQuery}&token=${GNEWS_API_KEY}&page=${page}&lang=en`;

  try {
    const response = await axios.get(url);
    const newsData = response.data;
    res.json(newsData);
  } catch (error) {
    console.error('Error fetching news:', error.response ? error.response.data : error.message);
    res.status(500).json({ message: 'Error fetching news', error: error.response ? error.response.data : error.message });
  }
});

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to the Acowale News API! Use /news endpoint to fetch articles.');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
