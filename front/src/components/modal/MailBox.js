import React, { useState, useEffect } from "react";

import dummy from '../../assets/MOCK_DATA';
import Card from "./Card";

const MailBox = ({ onClose, onCardOpen, onCardClose }) => {
  const [limit] = useState(3);
  const [data, setData] = useState([]); // 더미 데이터
  const [selectedItem, setSelectedItem] = useState(null); // 개별 카드 선택

  useEffect(() => {
    setData(dummy);
  }, []);

  const openCard = (item) => {
    setSelectedItem(item);
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

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50"
      onClick={onClose}
    >
      <div className="bg-white rounded-lg p-8 w-[55%] h-[70%] overflow-y-auto">
        <h1 className="text-xl font-medium leading-6 text-gray-900 text-center my-5">우편함</h1>
        {selectedItem ? (
        <Card item={selectedItem} onClose={closeCard} />
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4">
              {data.map((item, index) => (
                <div key={index} className="text-center" onClick={() => openCard(item)}>
                  <img src={item.cover} alt={item.title} className="mx-auto"/>
                  <p>{item.title}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MailBox