import React, { useState } from 'react';

// CreateCard 컴포넌트 정의
const CreateCard = ({ onClick }) => {
  // 카드 작성 모달
  const [isCreateCardOpen, setIsCreateCardOpen] = useState(false);
  const openCreateCardModal = () => setIsCreateCardOpen(true);
  const closeCreateCardModal = () => setIsCreateCardOpen(false);

  return (
  <div className="relative">
    <button
    className="w-28 bg-sky-300 hover:bg-sky-500 text-white text-xs font-bold py-2 rounded"
      onClick={openCreateCardModal}
    >
      카드 작성하기
    </button>
    {isCreateCardOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-bg absolute inset-0" onClick={closeCreateCardModal}></div>
          <div className="modal p-4 bg-white rounded-lg">
            <span className="absolute top-2 right-2 cursor-pointer" onClick={closeCreateCardModal}>
              &times;
            </span>
            <input type="text" className="border border-gray-300 p-2 rounded mb-2" />
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">전송</button>
          </div>
        </div>
      )}
  </div>
  );
};

export default CreateCard;
