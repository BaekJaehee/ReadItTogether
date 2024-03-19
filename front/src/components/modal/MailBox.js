import React, { useState, useEffect } from "react";
import dummy from '../../assets/MOCK_DATA';
import Card from "./Card";

const MailBox = ({ onClose, onCardOpen, onCardClose }) => {
  const [limit] = useState(3);
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    // 더미 데이터에서 최대 3개의 아이템만 가져오도록 수정
    setData(dummy.slice(0, limit));
  }, [limit]);

  const openCard = (item) => {
    setSelectedItem(item);
    if (typeof onCardOpen === 'function') {
      onCardOpen();
    }
  }

  const closeCard = () => {
    setSelectedItem(null);
    if (typeof onCardClose === 'function') {
      onCardClose();
    }
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50"
      onClick={onClose}
    >
      <div className="bg-white rounded-lg p-8 w-[55%] h-[70%] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {/* 모달 내부 눌렀을 때 닫힘 방지 */}
        <h1 className="text-xl font-medium leading-6 text-gray-900 text-center my-5">우편함</h1>
        {selectedItem ? (
          <Card item={selectedItem} onClose={closeCard} />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.map((item, index) => (
                <div key={index} className="text-center" onClick={() => openCard(item)}>
                  <img src={item.cover} alt={item.title} className="mx-auto w-32 h-32 object-cover rounded-lg"/>
                  <p className="mt-2 text-sm font-semibold text-gray-800">{item.title}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MailBox;
