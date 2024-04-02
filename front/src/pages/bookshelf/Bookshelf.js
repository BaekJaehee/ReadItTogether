import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import GetBookShelfList from "../../api/book/bookshelf/GetBookshelfList";
import UpdateBook from "../../api/book/bookshelf/UpdateBook";

import BookFilter from "../../components/books/BookFilter";
import BookSort from "../../components/books/BookSort";
import Read from "../../components/books/Read";
import NotRead from "../../components/books/NotRead";
import updateBookshelf from "../../api/book/bookshelf/BookShelfupdate";
import deleteBookshelf from "../../api/book/bookshelf/BookShelfDelete";

const Bookshelf = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [bookshelfInfo, setBookshelfInfo] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isRead, setIsRead] = useState(false);
  const memberId = location.pathname.split("/").pop();

  const fetchBookshelfData = async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    try {
      const response = await GetBookShelfList(memberId, page);
      const newData = response.data.data;
      const nonDuplicateData = newData.filter(
        (newItem) => !bookshelfInfo.some((item) => item.bookId === newItem.bookId)
      );
      if (nonDuplicateData.length === 0) {
        setHasMore(false);
      }
      setBookshelfInfo((prev) => [...prev, ...nonDuplicateData]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Failed to fetch bookshelf data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookshelfData();
  }, [memberId, page, isLoading, hasMore]);

  const handleUpdateBookshelf = async (bookId) => {
    try {
      await updateBookshelf(bookId);
      console.log("잘변경됫나?");
      fetchBookshelfData(); // 이제 정의된 함수를 여기서 호출할 수 있습니다.
    } catch (error) {
      console.error("Failed to update bookshelf:", error);
    }
  };


  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setIsLoading(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleRead = () => {
    setIsRead(!isRead);
  };

  const readOrNotText = isRead ? "읽은 책 목록 보기" : "읽을 책 목록 보기";

  return (
    <div className="bg-sky-100 absolute inset-0 m-20">
      <div className="flex items-center justify-center my-2">
        <BookFilter />
      </div>
      {/* <div className="flex justify-center m-2">
        <input type="text" className="border-2 w-96" placeholder="Search by title..." />
        <button className="rounded bg-blue-500 hover:bg-blue-700 text-white px-3 py-1">Search</button>
      </div> */}
      <div className="flex justify-end mx-5 my-3">
        <BookSort />
        <div className="ml-4">
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input type="checkbox" className="sr-only" checked={isRead} onChange={toggleRead} />
              <div className="block w-14 h-8 rounded-full" style={{ backgroundColor: isRead ? '#4ade80' : '#60a5fa' }}></div>
              <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform duration-300 ease-in-out" style={{ transform: isRead ? 'translateX(100%)' : 'translateX(0)' }}></div>
            </div>
            <div className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{readOrNotText}</div>
          </label>
        </div>
        
      </div>
      <div className="flex my-3">
        {isRead ? (
          <Read bookshelfInfo={bookshelfInfo.filter((book) => book.isRead)} 
          handleClickBook={(bookId) => navigate(`/detail-book/${bookId}`)}
          handleUpdateBookshelf={handleUpdateBookshelf}
          handleDeleteBookshelf={deleteBookshelf}
           />
        ) : (
          <NotRead bookshelfInfo={bookshelfInfo.filter((book) => !book.isRead)} 
          handleClickBook={(bookId) => navigate(`/detail-book/${bookId}`)}
          handleUpdateBookshelf={handleUpdateBookshelf} 
          handleDeleteBookshelf={deleteBookshelf}
          />
        )}
      </div>
    </div>
  );
};

export default Bookshelf;
