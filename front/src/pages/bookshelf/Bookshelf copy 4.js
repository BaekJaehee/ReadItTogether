import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import GetBookShelfList from "../../api/book/bookshelf/GetBookshelfList";
import UpdateBook from "../../api/book/bookshelf/UpdateBook";

import BookFilter from "../../components/books/BookFilter";
import BookSort from "../../components/books/BookSort";

const Bookshelf = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [filter, setFilter] = useState({ genres: [] });
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sort, setSort] = useState(0);
  const [bookshelfInfo, setBookshelfInfo] = useState([]);
  const [toMemberId, setToMemberId] = useState('');
  const [loading, setLoading] = useState(false);
  // const [loaded, setLoaded] = useState(false);
  const [size, setSize] = useState(10000);

  useEffect(() => {
    const pathArray = location.pathname.split("/");
    const whoMemberId = pathArray[pathArray.length - 1];
    setToMemberId(whoMemberId);
  }, [location.pathname]);

  // useEffect(() => {
  //   if (!loaded) {
  //     fetchData();
  //     setLoaded(true);
  //   }
  // }, [loaded]); // loaded 상태 변경 시에만 fetchData 호출하도록 변경

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await GetBookShelfList(toMemberId, size, sort, searchKeyword);
      setBookshelfInfo(response.data);
    } catch (error) {
      console.error('데이터 불러오기 실패: ', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    fetchData(); // 필터 변경 시 fetchData 호출
  };

  const handleSort = async (sort) => {
    setSort(sort);
    fetchData(); // 정렬 변경 시 fetchData 호출
  }

  const handleSearch = async () => {
    fetchData(); // 검색 시 fetchData 호출
  };

  const handleClickBook = (bookId) => {
    navigate(`/detail-book/${bookId}`);
  };

  const switchBook = async (bookId) => {
    try {
      await UpdateBook(bookId);
      fetchData(); // 책 이동 시 fetchData 호출
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-sky-100 absolute inset-0 m-20">
      <div className="flex items-center justify-center my-2">
        <BookFilter onFilterChange={handleFilterChange} />
      </div>
      <div className="flex justify-center m-2">
        <input 
          type="text" 
          className="border-2 w-96" 
          placeholder="책 제목을 입력하세요" 
          onChange={(e) => setSearchKeyword(e.target.value)}
          value={searchKeyword}
        />
        <button className="rounded bg-blue-500 hover:bg-blue-700 text-white px-3 py-1" onClick={handleSearch}>
          검색
        </button>
      </div>
      <div className="flex justify-end mx-5 my-3">
        <BookSort onChange={handleSort} />
      </div>
      <div className="flex my-3">
        <div className="grid grid-cols-5 gap-5">
          {bookshelfInfo.length > 0 && (
            <div className="grid grid-cols-5 gap-5">
              {bookshelfInfo.map((book) => (
                <div key={book.bookId} className="text-center">
                  <div className="m-3 cursor-pointer" onClick={() => handleClickBook(book.bookId)}>
                    <img src={book.cover} alt={book.title} className="w-48 h-72" />
                    <p className="m-1 font-bold">{book.title}</p>
                  </div>
                  <button className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-full" onClick={() => { switchBook(book.bookId); }}>
                    {book.isRead === 1 ? '읽을 책으로' : '읽은 책으로'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookshelf;
