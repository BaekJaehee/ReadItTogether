import React, { useState, useEffect } from 'react';
import BookSortForm from '../../api/book/BookSortForm';

const BookSort = () => {
  const [books, setBooks] = useState([]);

  const handleSortChange = async (e) => {
    const sortOption = e.target.value;
    const sortedBooks = await getSortedBooks(sortOption, 'asc'); // 오름차순으로 정렬된 책 가져오기
    setBooks(sortedBooks);
  };

  const handleOrder = async (e) => {
    const orderOption = e.target.value;
    const orderedBooks = await getSortedBooks('default', orderOption); // 선택된 정렬 옵션에 따라 정렬된 책 가져오기
    setBooks(orderedBooks);
  };

  const getSortedBooks = async (sortOption, orderOption) => {
    const sortedBooks = await BookSortForm(sortOption, orderOption);
    return sortedBooks;
  };

  useEffect(() => {
    const initBooks = async () => {
      const defaultSortedBooks = await getSortedBooks('default', 'asc'); // 기본적으로 등록순으로 오름차순 정렬된 책 가져오기
      setBooks(defaultSortedBooks);
    };
    initBooks();
  }, []);

  return (
    <div>
      <select onChange={handleSortChange}>
        <option value="default">등록순</option>
        <option value="name">이름순</option>
        <option value="rating">별점순</option>
        <option value="publishDate">출간일순</option>
      </select>
      <select onChange={handleOrder}>
        <option value="asc">오름차순</option>
        <option value="desc">내림차순</option>
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
