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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const pathArray = location.pathname.split("/");
    const whoMemberId = pathArray[pathArray.length - 1];
    setIsMemberPage(whoMemberId);
    setToMemberId(whoMemberId);
  }, [location.pathname]);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const handleSort = async (newSort) => {
    setSort(newSort);
  }

  const handleSearch = (keyword) => {
    setSearchKeyword(keyword);
    setIsSearching(true);
    setPage(0);
  };

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
    };

    if (isSearching || searchKeyword || sort !== 0 || page !== 0) {
      fetchData();
    }
  }, [isSearching, searchKeyword, sort, page]); 

  const handleClickBook = (bookId) => {
    navigate(`/detail-book/${bookId}`);
  }
  
  const toggleRead = () => {
    setIsSearching(true);
    setIsRead((prevIsRead) => !prevIsRead);
    setCurrentComponent((prevComponent) => (prevComponent === 'NotRead' ? 'Read' : 'NotRead'));
    setSearchKeyword('');
    setPage(0);
    setSort(0);
  };

  const handleScroll = () => {
    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || window.innerHeight;
    
    if (scrollTop + clientHeight >= scrollHeight - 100 && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading]); 

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
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
        <BookSort onChange={handleSort} />
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <label className="inline-flex items-center cursor-pointer">
          <input type="checkbox" value="" className="sr-only peer" onChange={toggleRead}/>
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{isRead ? '읽은 책 보기' : '읽을 책 보기'}</span>
        </label>
      </div>
      <div className="flex my-3">
        {currentComponent === 'NotRead' ? (
          <NotRead 
            bookshelfInfo={!isSearching && !isRead ? bookshelfInfo.filter((book) => book.isRead === 0) : bookshelfInfo.filter((book) => book.isRead === 0 && book.title.includes(searchKeyword))} 
            handleClickBook={handleClickBook} 
          />
        ) : (
          <Read 
            bookshelfInfo={!isSearching && isRead ? bookshelfInfo.filter((book) => book.isRead === 1) : bookshelfInfo.filter((book) => book.isRead === 1 && book.title.includes(searchKeyword))} 
            handleClickBook={handleClickBook} 
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