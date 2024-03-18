import React, { useState } from "react";
import BookFilter from "../../components/books/BookFilter";

const Bookshelf = () => {
  const [filter, setFilter] = useState({ genres: [] });

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    // 필터링 로직: API 요청, 상태 업데이트
  };

  return (
    <div className="bg-sky-100 absolute inset-0 m-20">
      <div className="flex items-center justify-center">
        <BookFilter onFilterChange={handleFilterChange} />
        {/* 필터링된 책 목록을 여기에 렌더링합니다. */}
      </div>
    </div>
  );
};

export default Bookshelf;
