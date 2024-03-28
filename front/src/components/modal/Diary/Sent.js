import React, { useState, useEffect } from "react";
// import axios from "axios";
import dummy from '../../../assets/MOCK_DATA';
import Card from '../Card';

const Sent = ({ onCardOpen, onCardClose, cards }) => {
  const [page, setPage] = useState(1);  // 기본 페이지 1
  const [limit] = useState(10); // 페이지당 아이템 수
  const [data, setData] = useState([]); // 더미 데이터
  const [currentPageData, setCurrentPageData] = useState([]); // 현재 페이지에 표시될 데이터
  const [selectedItem, setSelectedItem] = useState(null); // 개별 카드 선택
  const [showPagination, setShowPagination] = useState(true); // 페이지 보이기/숨기기
  // const offset = (page - 1) * limit;4
  
  // 페이지 이동
  const goToPrev = () => {
    setPage(page - 1);
  };

  const goToNext = () => {
    setPage(page + 1);
  };

  useEffect(() => {
    // setData(dummy);
    setData(cards);
  }, [cards]);

  const openCard = (item) => {
    setSelectedItem(item);
    setShowPagination(false);
    if (typeof onCardOpen === 'function') {
      onCardOpen(); // onCardOpen 함수가 존재하고 함수일 때만 호출
    }
  }


  const closeCard = () => {
    setSelectedItem(null);
    setShowPagination(true);
    if (typeof onCardClose === 'function') {
      onCardClose();  // 닫을 때도 똑같이
    }
  }
  
  useEffect(() => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    setCurrentPageData(data.slice(startIndex, endIndex));
  }, [data, limit, page]);

  return (
    <div>
      <h1 className="text-xl font-medium leading-6 text-gray-900 text-center my-5">보낸 카드</h1>
      {selectedItem ? (
        <Card item={selectedItem} onClose={closeCard} />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4">
            {currentPageData.map((item, index) => (
              <div key={index} className="text-center cursor-pointer" onClick={() => openCard(item)}>
                <img src={item.cover} alt={item.title} className="mx-auto"/>
              </div>
            ))}
          </div>
          {showPagination && (
            <div className="flex justify-center items-center mt-4">
              <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2" 
                onClick={goToPrev} disabled={page === 1}
              >
                이전
              </button>
              <span className="mx-2">{page}</span>
              <button 
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full ml-2" 
                onClick={goToNext} disabled={currentPageData.length < limit}
              >
                다음
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Sent;

