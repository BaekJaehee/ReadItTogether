import React, { useRef, useState } from "react";

// 모달 닫기 버튼 없어도 될듯

const Diary = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef();

  // 모달 열기
  const handleModalOpen = () => {
    setModalOpen(true);
  }

  // 모달 닫기
  // const handleModalClose = () => {
  //   setModalOpen(false);
  // }

  // 배경을 클릭했을 때 닫히도록
  const handleBackgroundClick = () => {
    setModalOpen(false);
  }

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col items-center">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleModalOpen}>모달 열기(여기에 다이어리 오브젝트)</button>
        </div>
      </div>
      {modalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50" ref={modalBackground} onClick={handleBackgroundClick}>
          <div className="bg-white rounded-lg p-8">
            <div></div>
            <p className="mb-4">여기에 데이터 보내준거 이미지랑 책 제목 map으로</p>
            {/* <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={handleModalClose}>모달 닫기</button> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Diary;
