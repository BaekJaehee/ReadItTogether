import React from 'react';
import img1 from "../../assets/book/img1.PNG"

const CreateCard = ({ handleCloseModal }) => {
  
  const handleSubmit = () => {
    // 전송 로직 처리 후 모달 닫기
    // setTimeout으로 모달을 일정 시간 후에 닫도록 설정
    setTimeout(() => {
      handleCloseModal();
    }, 2000); // 2초 후에 모달 닫힘
  };

  const handleCloseClick = (e) => {
    e.stopPropagation();
    handleCloseModal();
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50" onClick={handleCloseClick}>
      <div className="modal p-4 bg-white rounded-lg" onClick={(e) => e.stopPropagation()}>
        <span className="top-2 right-2 cursor-pointer" onClick={handleCloseClick}>
          &times;
        </span>
        <img src={img1} alt="cover"/>
        <input type="text" className="border border-gray-300 p-2 rounded mb-2" onClick={(e) => e.stopPropagation()} />
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" onClick={handleSubmit}>전송</button>
      </div>
    </div>
  );
};

export default CreateCard;
