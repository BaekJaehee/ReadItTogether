import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import GetBookShelfList from "../../api/book/bookshelf/GetBookshelfList";
import BookFilter from "../../components/books/BookFilter";
import BookSort from "../../components/books/BookSort";
import getSearchBooks from "../../api/book/BookSearch";
import Read from "../../components/books/Read";
import NotRead from "../../components/books/NotRead";

import pointUp from "../../assets/pointUp.png";

const Bookshelf = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const memberId = localStorage.getItem("memberId")
  const [filter, setFilter] = useState({ genres: [] });
  // const [searchResults, setSearchResults] = useState([]);
  // const [isSearching, setIsSearching] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sort, setSort] = useState(0);  // 정렬 옵션 기본값
  const [bookshelfInfo, setBookshelfInfo] = useState([]);
  const [toMemberId, setToMemberId] = useState('');
  const [isMemberPage, setIsMemberPage] = useState(false);
  const [isRead, setIsRead] = useState(false)
  const [currentComponent, setCurrentComponent] = useState('NotRead');
  const [page, setPage] = useState(0);  // 무한스크롤에 쓸 페이지

  const isReadOrNot = isRead === false ? '읽은 책 보기' : '읽을 책 보기'

  // 읽은 책으로 - 읽을 책으로 버튼 토글 -> O
  // isRead 기준으로 책 컴포넌트 구분(토글) -> O
  // 검색(GetBookshelfList searchKeyword) -> O
  // 정렬(별점순 제거, 출간일 -> 등록순, 0: 최신등록순(default))
  // 무한스크롤 -> O

  // 기본 컴포넌트가 설정했는데 안나옴 -> 왜 되지
  // 무한스크롤 추가하고 컴포넌트 토글이 안됨 -> 왜 되지
  // 무한스크롤 시 맨 위로 올라가는 버튼(화면 하단 붙박이) 필요 -> O

    const fetchBookshelfList = async () => {
      try {
        const response = await GetBookShelfList(toMemberId);
        setBookshelfInfo(response.data.data);
        console.log("책장목록: ", response.data.data);
      } catch (error) {
        console.log("책장 목록을 가져오는 데 실패했습니다: ", error);
      }
    };

    useEffect(() => {
      // URL에서 whoMemberId 추출
    const pathArray = location.pathname.split("/");
    const whoMemberId = pathArray[pathArray.length - 1];

    // 현재 페이지의 사용자 ID 업데이트
    setIsMemberPage(whoMemberId);
    setToMemberId(whoMemberId)

    // 초기 책장 목록 가져오기
    fetchBookshelfList();
  }, [location.pathname]);


  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    // 필터링 로직: API 요청, 상태 업데이트
  };

  // const handleSearch = async (searchTerm) => {
  //   // 검색 API 호출
  //   const results = await getSearchBooks(searchTerm);
  //   setSearchResults(results);
  // };

  // 검색어가 바뀔 때마다 & 정렬이 바뀔 때마다
  useEffect(() => {
    const fetchResults = async () => {
      if (searchKeyword !== '') {
        try {
          const response = await GetBookShelfList(toMemberId, 0, 10, sort, searchKeyword);
          setBookshelfInfo(response.data.data);
        } catch (error) {
          console.log("결과 목록을 가져오는 데 실패했습니다: ", error);
        }
      } else {
        // 검색어가 없으면 전체 목록을 가져옴
        fetchBookshelfList();
      }
    };
    fetchResults();
  }, [searchKeyword, sort]);

  // 검색어가 없는 상태에서 토글했을 때도 책장 목록을 다시 가져오도록 수정
  useEffect(() => {
    if (searchKeyword === '') {
      fetchBookshelfList();
    } else {
      const fetchResults = async () => {
        try {
          const response = await GetBookShelfList(toMemberId, 0, 10, sort, searchKeyword);
          setBookshelfInfo(response.data.data);
        } catch (error) {
          console.log("결과 목록을 가져오는 데 실패했습니다: ", error);
        }
      };
      fetchResults();
    }
  }, [searchKeyword, sort]);

  const handleClickBook = (bookId) => {
    navigate(`/detail-book/${bookId}`);  // 페이지 이동(or 새 탭)
  }

  // const toggleRead = () => {
  //   setIsRead(!isRead);
  //   setCurrentComponent(isRead ? 'NotRead' : 'Read');
  // };
  
  // 스크롤로 페이지가 이동이 되어도 토글이 되도록
  const toggleRead = () => {
    setIsRead((prevIsRead) => !prevIsRead);
    setCurrentComponent((prevComponent) => (prevComponent === 'NotRead' ? 'Read' : 'NotRead'));
    setSearchKeyword('')  // 검색어 초기화
    setBookshelfInfo([]); // 검색 결과 초기화
  };

  // useEffect(() => {
  //   const fetchBookshelfList = async () => {
  //     try {
  //       const response = await GetBookShelfList(toMemberId);
  //       setBookshelfInfo(response.data.data);
  //       console.log("책장목록: ", response.data.data);
  //     } catch (error) {
  //       console.log("책장 목록을 가져오는 데 실패했습니다: ", error);
  //     }
  //   };
  //   fetchBookshelfList();
  // }, [toMemberId]);

  // 무한 스크롤
  const handleScroll = () => {
    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || window.innerHeight;
    
    // 스크롤이 페이지 하단에 도달하면 추가 데이터를 불러옴
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      fetchMoreData();
      // toggleRead(); // 무한 스크롤 시 컴포넌트 토글도 함께 작동하도록 추가 -> 이러면 depth 오류
    }
  };
  
  // 스크롤 내리면 데이터 더 가져오기
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

  // 상위로 이동하는 버튼
  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
  
  return (
    <div className="bg-sky-100 absolute inset-0 m-20">
      <div className="flex items-center justify-center my-2">
        {/* 필터링된 책 목록 렌더링 */}
        <BookFilter onFilterChange={handleFilterChange} />
      </div>
      <div className="flex justify-center m-2">
        {/* 검색창과 버튼 -> 텍스트 입력 시 검색 진행(버튼x) */}
        <input 
          type="text" 
          className="border-2 w-96" 
          placeholder="책 제목을 입력하세요" 
          onChange={(e) => setSearchKeyword(e.target.value)}
          value={searchKeyword}
        />
        {/* <button className="rounded bg-blue-500 hover:bg-blue-700 text-white px-3 py-1">
          검색
        </button> */}
      </div>
      <div className="flex justify-end mx-5 my-3">
        {/* 정렬 기준 콤보박스 -> 백에서 줄거임 */}
        <BookSort onChange={(value) => setSort(value)} />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <label className="inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" className="sr-only peer" onChange={toggleRead}/>
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{isRead ? '읽은 책 보기' : '읽을 책 보기'}</span>
        </label>
      </div>
      <div className="flex my-3">
        {/* 여기에 책 나옴 */}
        {currentComponent === 'NotRead' ? (
          <NotRead 
            bookshelfInfo={bookshelfInfo.filter((book) => book.isRead === 0)} 
            handleClickBook={handleClickBook} 
            handleScroll={handleScroll} 
          />
        ) : (
          <Read 
            bookshelfInfo={bookshelfInfo.filter((book) => book.isRead === 1)} 
            handleClickBook={handleClickBook} 
            handleScroll={handleScroll} 
          />
        )}
      </div>
      <div className="fixed bottom-5 right-5">
        <img src={pointUp} onClick={goToTop} className="cursor-pointer w-5 h-5" alt="Go to Top" />
      </div>
    </div>
  );
};

export default Bookshelf;
