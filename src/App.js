import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import NewsList from './components/NewsList';
import './App.css';

function App() {
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('world');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews(searchQuery);
  }, [searchQuery]);

  const fetchNews = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/news?q=${query}`);
      setNews(response.data.articles);
    } catch (error) {
      console.error("Error fetching news: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  return (
    <div className="App">
      <Header onSearch={handleSearch} />
      {loading ? <h2>Loading...</h2> : <NewsList news={news} />}
      
    </div>
  );
}

export default App;