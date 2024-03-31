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

  useEffect(() => {
    const pathArray = location.pathname.split("/");
    const whoMemberId = pathArray[pathArray.length - 1];
    setIsMemberPage(whoMemberId);
    setToMemberId(whoMemberId)
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
  const handleSearch = async () => {
    setIsSearching(true);
    try {
      const response = await GetBookShelfList(toMemberId, 0, 10, sort, searchKeyword);
      setBookshelfInfo(response.data.data);
    } catch (error) {
      console.error('검색실패: ', error);
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    const fetchResults = async () => {
      if (isSearching) {
        try {
          const response = await GetBookShelfList(toMemberId, 0, 10, sort, searchKeyword);
          setBookshelfInfo(response.data.data);
        } catch (error) {
          console.log("결과 목록을 가져오는 데 실패했습니다: ", error);
        }
      }
    };
    fetchResults();
  }, [searchKeyword, sort]);

  const handleClickBook = (bookId) => {
    navigate(`/detail-book/${bookId}`);
  }
  
  // 무한스크롤에서도 토글이 되도록
  const toggleRead = () => {
    if (!isSearching) {
      setIsSearching(true); // 중복 호출 방지를 위해 검색 중인지 여부를 확인합니다.
      setIsRead(prevIsRead => !prevIsRead); // 읽은 책/읽을 책 토글
  
      setCurrentComponent(prevComponent => (prevComponent === 'NotRead' ? 'Read' : 'NotRead'));
      setSearchKeyword(''); // 검색어 초기화
      setPage(0); // 페이지 초기화
      setSort(0); // 정렬 초기화
  
      // 현재 컴포넌트에 해당하는 데이터 다시 가져오기
      const fetchData = async () => {
        try {
          const response = await GetBookShelfList(toMemberId, 0, 10, sort, '');
          setBookshelfInfo(response.data.data);
        } catch (error) {
          console.error('데이터를 가져오는 데 실패했습니다:', error);
        } finally {
          setIsSearching(false); // 검색 완료 후 상태를 다시 false로 변경합니다.
        }
      };
      fetchData();
    }
  };
  

  // const toggleRead = () => {
  //   setIsRead((prevIsRead) => !prevIsRead);
  //   setCurrentComponent((prevComponent) => (prevComponent === 'NotRead' ? 'Read' : 'NotRead'));
  //   setSearchKeyword(''); // 검색어 초기화
  //   setPage(0); // 페이지 초기화
  //   setSort(0); // 정렬 초기화
  //   // 현재 컴포넌트에 해당하는 데이터 다시 가져오기
  //   const fetchData = async () => {
  //     try {
  //       const response = await GetBookShelfList(toMemberId, 0, 10, sort, '');
  //       setBookshelfInfo(response.data.data);
  //     } catch (error) {
  //       console.error('데이터를 가져오는 데 실패했습니다:', error);
  //     }
  //   };
  //   fetchData();
  // };

  useEffect(() => {
    const fetchBookshelfList = async () => {
      try {
        const response = await GetBookShelfList(toMemberId);
        // setBookshelfInfo(response.data.data);
        setBookshelfInfo([...response.data.data]); // 원래 객체인데 배열로 변환하여 설정
        console.log("책장목록: ", response.data.data);
      } catch (error) {
        console.log("책장 목록을 가져오는 데 실패했습니다: ", error);
      }
    };
    fetchBookshelfList();
  }, [toMemberId]);

  // 무한스크롤
  const handleScroll = () => {
    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || window.innerHeight;
    
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      fetchMoreData();
    }
  };
  
  const fetchMoreData = async () => {
    try {
      const nextPage = page + 1;
      const response = await GetBookShelfList(toMemberId, nextPage);
      const newData = response.data.data;
      setBookshelfInfo(prevData => [...prevData, ...newData]);
      setPage(nextPage);
    } catch (error) {
      console.log("추가 데이터를 불러오는 데 실패했습니다: ", error);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 최상단으로
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  // bookshelfInfo를 업데이트
  const updateBookshelfInfo = async () => {
    try {
      const updatedBookshelf = await GetBookShelfList(toMemberId);
      setBookshelfInfo(updatedBookshelf.data.data);
    } catch (error) {
      console.error("책장 목록을 업데이트하는 데 실패했습니다:", error);
    }
  };
  
  return (
    <div className="bg-sky-100 absolute inset-0 m-20">
      {/* 장르 체크 */}
      <div className="flex items-center justify-center my-2">
        <BookFilter onFilterChange={handleFilterChange} />
      </div>
      {/* 검색 */}
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
        {/* 정렬 */}
        {/* <BookSort onChange={(value) => setSort(value)} /> */}
        <BookSort onChange={handleSort} />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <label className="inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" className="sr-only peer" onChange={toggleRead}/>
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{isRead ? '읽은 책 보기' : '읽을 책 보기'}</span>
        </label>
      </div>
      {/* 책 표시 */}
      <div className="flex my-3">
        {currentComponent === 'NotRead' ? (
          <NotRead 
            bookshelfInfo={!isSearching && !isRead ? bookshelfInfo.filter((book) => book.isRead === 0) : bookshelfInfo.filter((book) => book.isRead === 0 && book.title.includes(searchKeyword))} 
            handleClickBook={handleClickBook} 
            handleScroll={handleScroll} 
            updateBookshelfInfo={updateBookshelfInfo}
          />
        ) : (
          <Read 
            bookshelfInfo={!isSearching && isRead ? bookshelfInfo.filter((book) => book.isRead === 1) : bookshelfInfo.filter((book) => book.isRead === 1 && book.title.includes(searchKeyword))} 
            handleClickBook={handleClickBook} 
            handleScroll={handleScroll} 
            updateBookshelfInfo={updateBookshelfInfo}
          />
        )}
      </div>
      {/* 최상단으로 */}
      <div className="fixed bottom-5 right-5">
        <img src={pointUp} onClick={goToTop} className="cursor-pointer w-5 h-5" alt="Go to Top" />
      </div>
    </div>
  );
};

export default Bookshelf;
