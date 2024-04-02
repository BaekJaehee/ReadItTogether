import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import GetBookShelfList from "../../api/book/bookshelf/GetBookshelfList";

import BookFilter from "../../components/books/BookFilter";
import BookSort from "../../components/books/BookSort";
import Read from "../../components/books/Read";
import NotRead from "../../components/books/NotRead";

import pointUp from "../../assets/pointUp.png";

const Bookshelf = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [filter, setFilter] = useState({ genres: [] });
  const [isSearching, setIsSearching] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sort, setSort] = useState(0);
  const [bookshelfInfo, setBookshelfInfo] = useState([]);
  const [toMemberId, setToMemberId] = useState('');
  const [isMemberPage, setIsMemberPage] = useState(false);
  const [isRead, setIsRead] = useState(false);
  const [currentComponent, setCurrentComponent] = useState('NotRead');
  const [page, setPage] = useState(0);
  // const isReadOrNot = isRead === false ? '읽은 책 보기' : '읽을 책 보기';

  // 읽은 책으로 - 읽을 책으로 버튼 토글 -> O
  // isRead 기준으로 책 컴포넌트 구분(토글) -> O
  // 검색(GetBookshelfList searchKeyword) -> O
  // 정렬(별점순 제거, 출간일 -> 등록순, 0: 최신등록순(default))
  // 무한스크롤 -> 상태변경 되니까 이게 또 이상한 것 같음
  // 책 상태 변경 -> O

  // 기본 컴포넌트가 설정했는데 안나옴 -> 왜 되지
  // 무한스크롤 추가하고 컴포넌트 토글이 안됨 -> 왜 되지
  // 무한스크롤 시 맨 위로 올라가는 버튼(화면 하단 붙박이) 필요 -> O
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const pathArray = location.pathname.split("/");
    const whoMemberId = pathArray[pathArray.length - 1];
    setIsMemberPage(whoMemberId);
    setToMemberId(whoMemberId);
  }, [location.pathname]);

  // 장르 체크
  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  // 정렬
  const handleSort = async (sort) => {
    try {
      const response =  await GetBookShelfList(toMemberId, 0, 10, sort, searchKeyword);
      setBookshelfInfo(response.data.data);
      setSort(sort);
    } catch (error) {
      console.error('정렬실패: ', error);
    }
  }
  // 검색  
  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
  }

  useEffect(() => {
    if (page === 0) setBookshelfInfo([]); // Reset bookshelfInfo when page is 0

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await GetBookShelfList(toMemberId, page, 10, sort, searchKeyword);
        setBookshelfInfo((prevBookshelfInfo) => [
          ...prevBookshelfInfo,
          ...response.data.data,
        ]);
        setIsSearching(false);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    }
    if (isSearching || searchKeyword || sort !== 0 || page !== 0) {
      fetchData();
    }
  }, [isSearching, searchKeyword, sort, page]); 

  const handleClickBook = (bookId) => {
    navigate(`/detail-book/${bookId}`);
  }

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

  return (
    <div className="bg-sky-100 absolute inset-0 m-20">
      {/* 장르 체크 */}
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
        <button className="rounded bg-blue-500 hover:bg-blue-700 text-white px-3 py-1" onClick={() => handleSearch(searchKeyword)}>
          검색
        </button>
      </div>
      <div className="flex justify-end mx-5 my-3">
        {/* 정렬 */}
        {/* <BookSort onChange={(value) => setSort(value)} /> */}
        <BookSort onChange={handleSort} />
      </div>
      </div>
      {/* 책 표시 */}
      <div className="flex my-3">
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
      </div>
    </div>
  );

export default Bookshelf;
