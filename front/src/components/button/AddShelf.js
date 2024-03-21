import React, { useState } from 'react';

// AddShelf 컴포넌트 정의
const AddShelf = ({ onClick }) => {
  // 책장 추가 모달
  const [isAddShelfOpen, setIsAddShelfOpen] = useState(false);
  const openAddShelfModal = () => setIsAddShelfOpen(true);
  const closeAddShelfModal = () => setIsAddShelfOpen(false);

  // 책장에 넣는 로직 추가

  return (
    <div>
      <button
        className="w-28 bg-sky-300 hover:bg-sky-500 text-white text-xs font-bold py-2 rounded"
        onClick={openAddShelfModal}
      >
        내 책장 등록하기
      </button>
      {isAddShelfOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-bg absolute inset-0" onClick={closeAddShelfModal}></div>
          <div className="modal p-4 bg-white rounded-lg">
            <span className="absolute top-2 right-2 cursor-pointer" onClick={closeAddShelfModal}>
              &times;
            </span>
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
              <p className="">읽은책</p>
              <p>이 책을 읽으셨나요?</p>
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
              <p>읽을책</p>
              <p>이 책을 아직 안 읽으셨나요?</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddShelf;
