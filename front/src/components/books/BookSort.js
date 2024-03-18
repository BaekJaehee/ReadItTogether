import React, { useState, useEffect } from 'react';
import BookSortForm from '../../api/book/BoiokSortForm';

const BookSort = () => {
  const [books, setBooks] = useState([]);

  const handleSortChange = async (e) => {
    const sortOption = e.target.value;
    const sortedBooks = await BookSortForm(sortOption); // 선택된 정렬 옵션에 따라 책 목록을 다시 가져옴
    setBooks(sortedBooks);
  };

  useEffect(() => {
    const initBooks = async () => {
      const sortedBooks = await BookSortForm('default');
      setBooks(sortedBooks);
    };
    initBooks();
  }, []);

  return (
    <div>
      <select onChange={handleSortChange}>
        <option value="default">등록순</option>
        <option value="name">이름순</option>
        <option value="rating">별점순</option>
        <option value="publishDate">출간일 순</option>
      </select>
      <ul>
        {books.map((book) => (
          <li key={book.id}>{book.name} - 별점: {book.rating}, 출간일: {book.publishDate}</li>
        ))}
      </ul>
    </div>
  );
};

export default BookSort;