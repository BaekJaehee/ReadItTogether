import React, { useState } from "react";
import BookFilter from "../../components/books/BookFilter";
import BookSort from "../../components/books/BookSort";

const Bookshelf = () => {
  const [filter, setFilter] = useState({ genres: [] });

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    // 필터링 로직: API 요청, 상태 업데이트
  };

  return (
    <div className="bg-sky-100 absolute inset-0 m-20">
      <div className="flex items-center justify-center my-2">
        <BookFilter onFilterChange={handleFilterChange} />
        {/* 필터링된 책 목록을 여기에 렌더링합니다. */}
      </div>
      <div className="flex justify-center m-2">
        {/* 검색창과 버튼 */}
        <input type="text" className="border-2 w-96" placeholder="제목을 입력하세요"/>
        <button className="rounded bg-blue-500 hover:bg-blue-700 text-white px-3 py-1">
          검색
        </button>
      </div>
      <div className="flex justify-end mx-24">
        {/* 정렬 기준 콤보박스 */}
        <BookSort />
      </div>
      <div className="flex justify-center my-3">
        <div className="grid grid-cols-4 gap-4">
          {/* 여기에 책 나옴 */}
          <div className="m-2 flex-grow">
            <div className="aspect-w-4 aspect-h-5">
              <img src="https://image.yes24.com/momo/TopCate60/MidCate07/5962038.jpg" alt="cover" className="object-cover w-full h-full"/>
            </div>
            <p className="text-center m-1">제목</p>
          </div>
          <div className="m-2 flex-grow">
            <div className="aspect-w-4 aspect-h-5">
              <img src="https://image.yes24.com/goods/77984363/XL" alt="cover" className="object-cover w-full h-full"/>
            </div>
            <p className="text-center m-1">제목</p>
          </div>
          <div className="m-2 flex-grow">
            <div className="aspect-w-4 aspect-h-5">
              <img src="https://image.yes24.com/goods/115170540/XL" alt="cover" className="object-cover w-full h-full"/>
            </div>
            <p className="text-center m-1">제목</p>
          </div>
          <div className="m-2 flex-grow">
            <div className="asepct-w-4 aspect-h-5">
              <img src="https://image.yes24.com/goods/118755085/XL" alt="cover" className="object-cover w-full h-full"/>
            </div>
            <p className="text-center m-1">제목</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookshelf;
