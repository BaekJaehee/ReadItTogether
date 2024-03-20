import React from 'react';

// AddShelf 컴포넌트 정의
const AddShelf = ({ onClick }) => {
  return (
    <button
      className="w-28 bg-sky-300 hover:bg-sky-500 text-white text-xs font-bold py-2 rounded"
      onClick={onClick}
    >
      내 책장 등록하기
    </button>
  );
};

export default AddShelf;
