import React, { useState, useRef } from "react";
import axios from "axios";
import Received from "./Received";
import Sent from "./Sent";

// 받은 카드 리스트에서 책 표지 클릭 시 카드 상세
// 하단 페이지네이션
// 카드 등록일 기준으로 정렬

const Diary = () => {
  const [currentComponent, setCurrentComponent] = useState(<Received/>);  // 열었을 시 기본은 받은 카드
  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef();

  // 모달 열기
  const handleModalOpen = () => {
    setModalOpen(true);
  }

  // 배경을 클릭했을 때 닫히도록
  const handleBackgroundClick = () => {
    setModalOpen(false);
  }

  const handleReceivedClick = () => {
    setCurrentComponent(<Received />);
  };

  const handleSentClick = () => {
    setCurrentComponent(<Sent />);
  };

  // 모달 내에서 버튼을 클릭해도 모달이 닫히지 않도록
  const handleButtonClick = (e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleModalOpen}>모달 열기(여기에 다이어리 오브젝트)</button>
        </div>
      </div>
      {modalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-15" ref={modalBackground} onClick={handleBackgroundClick}>
            <div className="bg-white rounded-lg p-8 max-w-[50%] max-h-[70%] overflow-y-auto" onClick={handleButtonClick}>            <div className="flex justify-around">
              <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={handleReceivedClick}>받은 카드</button>
              <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded" onClick={handleSentClick}>보낸 카드</button>
            </div>
            <div>
              {currentComponent}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Diary;
