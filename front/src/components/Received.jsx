import React, { useState, useEffect } from "react";
// import axios from "axios";
import dummy from '../assets/MOCK_DATA';

const Received = () => {
  const [page, setPage] = useState(1);  // 기본 페이지 1
  const [limit] = useState(10); // 페이지당 아이템 수
  const [data, setData] = useState([]); // 더미 데이터
  const [currentPageData, setCurrentPageData] = useState([]); // 현재 페이지에 표시될 데이터
  // const offset = (page - 1) * limit;4
  
  // 페이지 이동
  const goToPrev = () => {
    setPage(page - 1);
  };

  const goToNext = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    setData(dummy);
  }, []);
  
  useEffect(() => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    setCurrentPageData(data.slice(startIndex, endIndex));
  }, [data, limit, page]);

  return (
    <div>
      <h1>받은 카드</h1>
      <div className="grid grid-cols-2 gap-4">
        {currentPageData.map((item, index) => (
          <div key={index}>
            <img src={item.cover} alt={item.title} />
            <p>{item.title}</p>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={goToPrev} disabled={page === 1}>이전</button>
        <span>{page}</span>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={goToNext} disabled={currentPageData.length < limit}>다음</button>
      </div>
    </div>
  );
}

export default Received;