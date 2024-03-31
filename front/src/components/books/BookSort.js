import React, { useState, useEffect } from 'react';
// import BookSortForm from '../../api/book/BookSortForm';
import getSortedBooks from '../../api/book/BookSortForm';

const BookSort = ({ onChange }) => {
  // const [books, setBooks] = useState([]);
  const [selectedSortOption, setSelectedSortOption] = useState(0);

  const handleSortChange = async (e) => {
    const sortOption = e.target.value;
    setSelectedSortOption(sortOption);
    onChange(sortOption); // 선택된 정렬 옵션 값을 상위 컴포넌트로 전달

    // const sortedBooks = await getSortedBooks(sortOption, 'desc'); // 선택된 정렬 옵션에 따라 책 목록을 다시 가져옴
    // setBooks(sortedBooks);
  };

  useEffect(() => {
    onChange(0);  // 초기에는 "등록순"이 선택되어 있도록 설정
  }, [onChange]);

  // const handleOrder = async (e) => {
  //   const orderOption = e.target.value;
  //   const orderedBooks = await getSortedBooks('default', orderOption);
  //   setBooks(orderedBooks);
  // };

  // const getSortedBooks = async (sortOption, orderOption) => {
  //   const sortedBooks = await BookSortForm(sortOption, orderOption);
  //   return sortedBooks;
  // };

  // useEffect(() => {
  //   const initBooks = async () => {
  //     const defaultSortedBooks = await getSortedBooks('default', 'desc'); // 기본적으로 등록순으로 내림차순 정렬된 책 가져오기
  //     setBooks(defaultSortedBooks);
  //   };
  //   initBooks();
  // }, []);

  return (
    <div>
      <select value={selectedSortOption} onChange={handleSortChange} className="mr-2">
      <option value="0">등록순</option>
        <option value="1">평점순</option>
        <option value="2">제목순</option>
        {/* <option value="publishDate">출간일순</option> */}
      </select>
      {/* <select onChange={handleOrder}>
        <option value="asc">오름차순</option>
        <option value="desc">내림차순</option>
      </select> */}
      {/* <ul>
        {books.map((book) => (
          <li key={book.id}>{book.name} - 별점: {book.rating}, 출간일: {book.publishDate}</li>
        ))}
      </ul> */}
    </div>
      );
    };

export default BookSort;
