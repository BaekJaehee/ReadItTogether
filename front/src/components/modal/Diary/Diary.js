import React, { useState } from "react";
import Received from "./Received";
import Sent from "./Sent";

// 카드 등록일 기준으로 정렬

const Diary = ({ onClose }) => {
  const [receivedCards, setReceivedCards] = useState([]);
  const [sentCards, setSentCards] = useState([]);
  
  const handleCardOpen = () => {
    setShowButtons(false); // 카드가 열리면 버튼 숨김
  };
  
  const handleCardClose = () => {
    setShowButtons(true); // 카드가 닫히면 버튼 보이기
  }

  // Cannot access 'handleCardOpen' before initialization
  // const [currentComponent, setCurrentComponent] = useState(<Received onCardOpen={handleCardOpen} onCardClose={handleCardClose}/>);  // 열었을 시 기본은 받은 카드
  const [currentComponent, setCurrentComponent] = useState('received');  // 열었을 시 기본은 받은 카드
  const [showButtons, setShowButtons] = useState(true);

  // const handleReceivedClick = () => {
  //   setCurrentComponent(<Received onCardOpen={handleCardOpen} onCardClose={handleCardClose}/>);
  // };

  // const handleSentClick = () => {
  //   setCurrentComponent(<Sent onCardOpen={handleCardOpen} onCardClose={handleCardClose}/>);
  // };

  const handleReceivedClick = () => {
    setCurrentComponent('received');
  };

  const handleSentClick = () => {
    setCurrentComponent('sent');
  };

  // 모달 내에서 버튼을 클릭해도 모달이 닫히지 않도록
  const handleButtonClick = (e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50"
      onClick={onClose}
    >
      <div className="bg-white rounded-lg p-8 w-[45%] h-[70%] overflow-y-auto" onClick={handleButtonClick}>            
        {showButtons && (
          <div className="flex justify-around">
            <button 
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" 
              onClick={handleReceivedClick}
            >
              받은 카드
            </button>
            <button 
              className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" 
              onClick={handleSentClick}
            >
              보낸 카드
            </button>
          </div>
        )}
        <div>
          {/* {currentComponent} */}
          {/* 삼항연산자 */}
          {currentComponent === 'received' ? (
            <Received cards={receivedCards} onCardOpen={handleCardOpen} onCardClose={handleCardClose} />
          ) : (
            <Sent cards={sentCards} onCardOpen={handleCardOpen} onCardClose={handleCardClose} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Diary;