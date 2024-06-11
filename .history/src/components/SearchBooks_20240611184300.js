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

  const handlePageChange = (e) => {
    setPagination({ ...pagination, page: parseInt(e.target.value) });
  };

  const handleSizeChange = (e) => {
    setPagination({ ...pagination, size: parseInt(e.target.value) });
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books', {
        params: { ...searchCriteria, ...sortCriteria, ...pagination }
      });
      setBooks(response.data.books);
      setTotalPages(response.data.totalPages);
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
        <div>
          <label>
            Page:
            <input
              type="number"
              name="page"
              value={pagination.page}
              onChange={handlePageChange}
              min="1"
            />
          </label>
          <label>
            Page Size:
            <input
              type="number"
              name="size"
              value={pagination.size}
              onChange={handleSizeChange}
              min="1"
            />
          </label>
        </div>
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        {books.length > 0 ? (
          <ul>
            {books.map((book) => (
              <li key={book.id}>{book.title} by {book.author} published in {book.publishedYear}</li>
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
