import React, { useState, useEffect } from "react";
// import axios from "axios";
import Card from '../Card';
import handleCardList from "../../../api/card/HandleCardList";
import handleCardDetail from "../../../api/card/HandleCardDetail";
import Carousel from "../../Carousel";

const Received = ({ onCardOpen, onCardClose, cards }) => {
  const [page, setPage] = useState(1);  // 기본 페이지 1
  const [limit] = useState(4); // 페이지당 아이템 수
  // const [data, setData] = useState([]); // 더미 데이터
  // const [currentPageData, setCurrentPageData] = useState([]); // 현재 페이지에 표시될 데이터
  const [currentPageDataReceived, setCurrentPageDataReceived] = useState([]); // 현재 페이지에 표시될 데이터 구분
  const [selectedItem, setSelectedItem] = useState(null); // 개별 카드 선택
  const [selectedItemDetail, setSelectedItemDetail] = useState(null); // 개별 카드의 디테일


  const openCard = async (item) => {
    setSelectedItem(item);
    
    // 상세정보
    const response = await handleCardDetail(item.cardId);
    setSelectedItemDetail(response.data);

    if (typeof onCardOpen === 'function') {
      onCardOpen(); // onCardOpen 함수가 존재하고 함수일 때만 호출
    }
  }

  const closeCard = () => {
    setSelectedItem(null);
    if (typeof onCardClose === 'function') {
      onCardClose();  // 닫을 때도 똑같이
    }
  }
  const handleDeleteAndUpdate = (deletedCardId) => {
    setCurrentPageDataReceived(prevData =>
      prevData.filter(card => card.cardId !== deletedCardId)
    );
  };
  
  return (
    <div>
      <h1 className="text-xl font-medium leading-6 text-gray-900 text-center my-5">보낸 카드</h1>
      {selectedItem ? (
        <Card item={selectedItem} onClose={closeCard} />
      ) : (
        <Carousel slides={currentPageDataReceived.map((item, index) => (
          <div key={index} className="text-center cursor-pointer" onClick={() => openCard(item)}>
            <img src={item.cover} alt={item.title} className="mx-auto"/>
          </div>
        ))} />
      )}
    </div>
  );
}

export default Received;

