import React, { useState } from 'react';

function Header({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      setQuery('');
    }
  };

  return (
    <header className="App-header">
      <h1>Acowale News</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search news..."
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
}

export default Header;
