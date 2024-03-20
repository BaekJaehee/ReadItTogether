import React, { useState, useEffect } from "react";
import axios from "axios";
import dummy from '../../assets/MOCK_DATA';
import Card from './Card';

const Received = ({ onCardOpen, onCardClose, loggedInUser }) => {
  const [page, setPage] = useState(1);  // 기본 페이지 1
  const [limit] = useState(10); // 페이지당 아이템 수
  const [data, setData] = useState([]); // 더미 데이터
  const [currentPageData, setCurrentPageData] = useState([]); // 현재 페이지에 표시될 데이터
  const [selectedItem, setSelectedItem] = useState(null); // 개별 카드 선택
  const [showPagination, setShowPagination] = useState(true); // 페이지 보이기/숨기기
  // const offset = (page - 1) * limit;4

  // 받은 카드 필터링
  const filterReceivedCards = () => {
    return data.cards.filter(card => card.to_member_id === loggedInUser);
  };
  
  // 페이지 이동
  const goToPrev = () => {
    setPage(page - 1);
  };

  const goToNext = () => {
    setPage(page + 1);
  };

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

  // useEffect(() => {
  //   setData(dummy);
  // }, []);

  useEffect(() => {
    axios.get('backend/api/endpoint')
      .then(response => {
        setData(response.data); // 받아온 데이터를 상태에 설정
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    // 데이터를 백엔드에서 받아온 후 실행되는 코드
    const receivedCards = filterReceivedCards();
  }, [data]); // data가 변경될 때마다 실행됨
  
  useEffect(() => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    setCurrentPageData(data.slice(startIndex, endIndex));
  }, [data, limit, page]);

  return (
    <div>
      <h1 className="text-xl font-medium leading-6 text-gray-900 text-center my-5">받은 카드</h1>
      {selectedItem ? (
        <Card item={selectedItem} onClose={closeCard} />
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4">
            {currentPageData.map((item, index) => (
              <div key={index} className="text-center" onClick={() => openCard(item)}>
                <img src={item.cover} alt={item.title} className="mx-auto"/>
                <p>{item.title}</p>
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

export default Received;