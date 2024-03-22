import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BookFilter from "../../components/books/BookFilter";
import BookSort from "../../components/books/BookSort";
import getSearchBooks from "../../api/book/BookSearch";

const Bookshelf = () => {
  const [filter, setFilter] = useState({ genres: [] });
  const navigate = useNavigate();
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    // 필터링 로직: API 요청, 상태 업데이트
  };

  const handleSearch = async (searchTerm) => {
    // 검색 API 호출
    const results = await getSearchBooks(searchTerm);
    setSearchResults(results);
  };

  const handleClickBook = (bookId) => {
    navigate.pushState(`/books/${bookId}`);  // 페이지 이동(or 새 탭)
  }

  return (
    <div className="bg-sky-100 absolute inset-0 m-20">
      <div className="flex items-center justify-center my-2">
        <BookFilter onFilterChange={handleFilterChange} />
        {/* 필터링된 책 목록을 여기에 렌더링합니다. */}
      </div>
      <div className="flex justify-center m-2">
        {/* 검색창과 버튼 -> 텍스트 입력 시 검색 진행(버튼x) */}
        <input 
          type="text" 
          className="border-2 w-96" 
          placeholder="제목을 입력하세요" 
          // onChange={(e) => handleSearch(e.target.value)}
        />
        <button className="rounded bg-blue-500 hover:bg-blue-700 text-white px-3 py-1">
          검색
        </button>
      </div>
      <div className="flex justify-end mx-24">
        {/* 정렬 기준 콤보박스 -> 백에서 줄거임*/}
        <BookSort/>
      </div>
      <div className="flex justify-center my-3">
        <div className="grid grid-cols-4 gap-4">
          {/* 여기에 책 나옴 */}
          {/* {searchResults.length > 0 || !isSearching ? (
          searchResults.map((book) => (
            <div key={book.id} className="m-3" onClick={() => handleClickBook(book.id)}>
              <img src={book.image} alt="cover" className="w-48 h-72"/>
              <p className="text-center m-1 font-bold">{book.title}</p>
            </div>
          ))
        ) : (
          books.map((book) => (
            <div key={book.id} className="m-3" onClick={() => handleClickBook(book.id)}>
              <img src={book.image} alt="cover" className="w-48 h-72"/>
              <p className="text-center m-1 font-bold">{book.title}</p>
            </div>
          ))
        )} */}
          <div className="my-3 mx-8 flex flex-col items-center">
            <div>
              {/* 도서 커버나 제목을 클릭하면 해당 도서 상세 페이지로 이동(onClick) */}
              <img src="https://image.yes24.com/momo/TopCate60/MidCate07/5962038.jpg" alt="cover" className="w-48 h-72 cursor-pointer" onClick={handleClickBook}/>
              <p className="text-center m-1 font-bold cursor-pointer" onClick={handleClickBook}>제목</p>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded-full mt-2">읽은 책으로</button>
          </div>
          <div className="m-3 flex flex-col items-center">
            <div>
              <img src="https://image.yes24.com/goods/77984363/XL" alt="cover" className="w-48 h-72 cursor-pointer" onClick={handleClickBook}/>
              <p className="text-center m-1 font-bold cursor-pointer" onClick={handleClickBook}>제목</p>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded-full mt-2">읽은 책으로</button>
          </div>
          <div className="m-3 flex flex-col items-center">
            <img src="https://image.yes24.com/goods/115170540/XL" alt="cover" className="w-48 h-72 cursor-pointer" onClick={handleClickBook}/>
            <p className="text-center m-1 font-bold cursor-pointer" onClick={handleClickBook}>제목</p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-3 rounded-full mt-2">읽은 책으로</button>
          </div>
          <div className="m-3 flex flex-col items-center">
            <img src="https://image.yes24.com/goods/118755085/XL" alt="cover" className="w-48 h-72 cursor-pointer" onClick={handleClickBook}/>
            <p className="text-center m-1 font-bold cursor-pointer" onClick={handleClickBook}>제목</p>
          </div>
          <div className="m-3 flex flex-col items-center">
            <img src="https://image.yes24.com/goods/55284735/XL" alt="cover" className="w-48 h-72 cursor-pointer" onClick={handleClickBook}/>
            <p className="text-center m-1 font-bold cursor-pointer" onClick={handleClickBook}>제목</p>
          </div>
          <div className="m-3 flex flex-col items-center">
            <img src="https://image.yes24.com/goods/125076258/XL" alt="cover" className="w-48 h-72 cursor-pointer" onClick={handleClickBook}/>
            <p className="text-center m-1 font-bold cursor-pointer" onClick={handleClickBook}>제목</p>
          </div>
          <div className="m-3 flex flex-col items-center">
            <img src="https://image.yes24.com/goods/123126171/XL" alt="cover" className="w-48 h-72 cursor-pointer" onClick={handleClickBook}/>
            <p className="text-center m-1 font-bold cursor-pointer" onClick={handleClickBook}>제목</p>
          </div>
          <div className="m-3 flex flex-col items-center">
            <img src="https://image.yes24.com/goods/122426425/XL" alt="cover" className="w-48 h-72 cursor-pointer" onClick={handleClickBook}/>
            <p className="text-center m-1 font-bold cursor-pointer" onClick={handleClickBook}>제목</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookshelf;
