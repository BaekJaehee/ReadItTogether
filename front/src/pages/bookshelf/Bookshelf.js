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
  const [isMemberPage, setIsMemberPage] = useState(false);
  const [toMemberId, setToMemberId] = useState('');
  const [loading, setLoading] = useState(false);
  const size = 10000;
  const page = 0

  useEffect(() => {
    const pathArray = location.pathname.split("/");
    const whoMemberId = pathArray[pathArray.length - 1];

    // 현재 페이지의 사용자 ID 업데이트
    setIsMemberPage(whoMemberId);
    setToMemberId(whoMemberId);
  }, []);

  useEffect(() => {
    const fetchBookshelfList = async () => {
      try {
        const response = await GetBookShelfList(toMemberId);
        setBookshelfInfo(response.data.data);
        console.log("책장목록: ", response.data.data);
      } catch (error) {
        console.log("책장 목록을 가져오는 데 실패했습니다: ", error);
      }
    };
    fetchBookshelfList();
  }, [toMemberId]);
  

  // const fetchData = async () => {
  //   setLoading(true);
  //   try {
  //     console.log("API 호출 전:", toMemberId, size, sort, searchKeyword); // 값이 올바른지 확인
  //     const response = await GetBookShelfList(toMemberId, size, sort, searchKeyword);
  //     console.log("API 호출 후:", response); // API 응답 확인
  //     // console.log("response.data: ", response.data)
  //     // console.log("response.data.data: ", response.data.data);
  //     // setBookshelfInfo(response.data.data);
  //   } catch (error) {
  //     console.error('데이터 불러오기 실패: ', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    // fetchData(); // 필터 변경 시 fetchData 호출
  };

  // const handleSort = async (newSort) => {
  //   setSort(newSort);
  //   // fetchData(); // 정렬 변경 시 fetchData 호출
  // }
  const handleSort = async (newSort) => {
    setSort(newSort);
    // toMemberId와 함께 sort 값을 전달해야 합니다.
    await GetBookShelfList(toMemberId, 0, size, newSort, searchKeyword);
  }
  

  const handleSearch = async () => {
    // fetchData(); // 검색 시 fetchData 호출
  };

  const handleClickBook = (bookId) => {
    navigate(`/detail-book/${bookId}`);
  };

  // const switchBook = async (bookId) => {
  //   try {
  //     await UpdateBook(bookId);
  //     // fetchData(); // 책 이동 시 fetchData 호출
  //     await GetBookShelfList();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const switchBook = async (bookId) => {
    try {
      await UpdateBook(bookId);
      // 책 이동 시 해당 책 정보만 업데이트하여 화면에 반영
      const updatedBookshelfInfo = bookshelfInfo.map(book => {
        if (book.bookId === bookId) {
          return { ...book, isRead: book.isRead === 0 ? 1 : 0 }; // 읽은 상태를 변경
        }
        return book;
      });
      setBookshelfInfo(updatedBookshelfInfo);
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
          {bookshelfInfo.length > 0 && bookshelfInfo.map((book) => (
            <div key={book.bookId} className="text-center">
              <div className="m-3 cursor-pointer" onClick={() => handleClickBook(book.bookId)}>
                <img src={book.cover} alt={book.title} className="w-48 h-72" />
                <p className="m-1 font-bold">{book.title}</p>
              </div>
              <button className={`py-2 px-4 rounded-full text-white ${book.isRead === 0 ? 'bg-green-500 hover:bg-green-700' : 'bg-blue-500 hover:bg-blue-700'}`} onClick={() => { switchBook(book.bookId); }}>
                {book.isRead === 0 ? '읽은 책으로' : '읽을 책으로'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Bookshelf;
