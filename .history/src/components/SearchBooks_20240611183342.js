import React, { useState } from 'react';
import axios from 'axios';

const SearchBooks = () => {
  const [books, setBooks] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState({
    title: '',
    author: '',
    genre: '',
    publishedYear: ''
  });

  const [sortCriteria, setSortCriteria] = useState({
    sortBy: 'title',
    order: 'asc'
  });

  const handleChange = (e) => {
    setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value });
  };

  const handleSortChange = (e) => {
    setSortCriteria({ ...sortCriteria, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books', {
        params: { ...searchCriteria, ...sortCriteria }
      });
      setBooks(response.data);
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div>
      <h1>Search Books</h1>
      <div>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={searchCriteria.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={searchCriteria.author}
          onChange={handleChange}
        />
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={searchCriteria.genre}
          onChange={handleChange}
        />
        <input
          type="number"
          name="publishedYear"
          placeholder="Published Year"
          value={searchCriteria.publishedYear}
          onChange={handleChange}
        />
        <div>
          <label>
            Sort By:
            <select name="sortBy" value={sortCriteria.sortBy} onChange={handleSortChange}>
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option value="publishedYear">Published Year</option>
            </select>
          </label>
          <label>
            Order:
            <select name="order" value={sortCriteria.order} onChange={handleSortChange}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </label>
        </div>
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        {books.length > 0 ? (
          <ul>
            {books.map((book) => (
              <li key={book.id}>{book.title} by {book.author}</li>
            ))}
          </ul>
        ) : (
          <p>No books found</p>
        )}
      </div>
    </div>
  );
};

export default SearchBooks;
