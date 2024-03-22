import React, { useEffect, useState } from 'react';
import img1 from "../../assets/book/img1.PNG"

const CreateCard = ({ onClose }) => {
  // 카드 작성 모달
  const [isCreateCardOpen, setIsCreateCardOpen] = useState(false);
  const openCreateCardModal = () => setIsCreateCardOpen(true);
  const closeCreateCardModal = () => setIsCreateCardOpen(false);

  const [comment, setComment] = useState('');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (comment.length >= 10) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [comment])
  
  const handleSubmit = () => {
    // 전송 로직 처리 후 모달 닫기
    // setTimeout으로 모달을 일정 시간 후에 닫도록 설정
    setTimeout(() => {
      onClose();
    }, 2000); // 2초 후에 모달 닫힘
  };

  // const handleCloseClick = (e) => {
  //   e.stopPropagation();
  //   handleCloseModal();
  // };


  return (
    <div>
      <button
        className="w-28 bg-sky-300 hover:bg-sky-500 text-white text-xs font-bold py-2 rounded"
        onClick={openCreateCardModal}
      >
        카드 작성하기
      </button>
      {isCreateCardOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" onClick={closeCreateCardModal}>
        <div className="modal p-4 bg-white rounded-lg" onClick={(e) => e.stopPropagation()}>
          {/* <span className="top-2 right-2 cursor-pointer" onClick={closeCreateCardModal}>
            &times;
          </span> */}
          <img src={img1} alt="cover"/>
          <input type="text" className="border border-gray-300 p-2 rounded mb-2" onClick={(e) => e.stopPropagation()} />
          <button className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${!isValid && 'opacity-50 cursor-not-allowed'}`} onClick={handleSubmit} disabled={!isValid}>전송</button>
          {/* <button className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${!isValid && 'opacity-50 cursor-not-allowed'}`} onClick={handleSubmit} disabled={!isValid}>전송</button> */}
        </div>
      </div>
      )}
    </div>
  );
};

export default CreateCard;
