import React from 'react';

// CreateCard 컴포넌트 정의
const CreateCard = ({ onClick }) => {
  return (
    <button
    className="w-28 bg-sky-300 hover:bg-sky-500 text-white text-xs font-bold py-2 rounded"
      onClick={onClick}
    >
      카드 작성하기
    </button>
  );
};

export default CreateCard;
