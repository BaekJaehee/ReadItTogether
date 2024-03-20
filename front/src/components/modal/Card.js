import React from "react";

import diaryButton from "../../assets/library/diaryButton.png";

const Card = ({ item, cardData, onClose }) => {
  // const { from_m_id, comment } = cardData;  // card 테이블에만 있는 정보
  // item은 card와 book에서 조인해서 받아온 정보

  return (
    <div>
      <div className="grid grid-cols-3 gap-1 text-center">
        {/* 표지 이미지(도서 테이블에서 조인으로 가져오기) */}
        <img
          src={item.cover}
          alt={item.title}
          className="col-span-1"
          />
        {/* 책 정보(도서 테이블에서 조인으로) */}
        <div className="col-span-2">
          <p className="text-xl font-semibold">{item.title}</p>
          <p>{item.author}</p>
          {/* {from_m_id && <p>보낸이: {from_m_id}</p>} */}
          {/* 받은 카드이고 보낸이 정보가 있을 때만 보여줌 */}
          {/* <p>{comment}</p> */}
        </div>
      </div>
      {/* 뒤로가기 버튼(실제로는 컴포넌트 닫기) */}
      <div className="flex justify-center mt-4">
        <button onClick={onClose}>
          <img className="w-7 h-7" src={diaryButton} alt="뒤로가기"/>
        </button>
      </div>
    </div>
  );
}

export default Card;