import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = 5000;

app.use(cors());

app.get('/api/news', async (req, res) => {
  const country = req.query.country || '';
  const keyword = req.query.q || '';
  const apiKey = process.env.NEWS_API_KEY;

  let url = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}`;
  if (country) url += `&country=${country}`;
  if (keyword) url += `&q=${encodeURIComponent(keyword)}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // If nothing found, try /everything
    if ((!data.articles || data.articles.length === 0) && keyword) {
      console.log('Fallback to /everything');
      const fallbackUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(keyword)}&apiKey=${apiKey}`;
      const fallbackResponse = await fetch(fallbackUrl);
      const fallbackData = await fallbackResponse.json();
      return res.json(fallbackData);
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
