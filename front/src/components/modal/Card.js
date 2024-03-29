import React, { useState, useEffect } from "react";
import handleCardDetail from "../../api/card/HandleCardDetail";
import handleCardDelete from "../../api/card/HandleCardDelete";

import diaryButton from "../../assets/library/diaryButton.png";
import deleteButton from "../../assets/library/deleteButton.png";

const Card = ({ item, onClose, onDelete }) => {
  const [cardDetail, setCardDetail] = useState(""); // 형식 제발 null로 하지말고
  const memberId = localStorage.getItem("memberId")
  // const { from_m_id, comment } = cardData;  // card 테이블에만 있는 정보
  // item은 card와 book에서 조인해서 받아온 정보

  const handleDelete = async (e) => {
    e.preventDefault(e);
    try {
      // const response = await handleCardDelete(item.cardId);
      await handleCardDelete(item.cardId);
      alert('카드가 삭제되었습니다.');
      onClose();
      onDelete(item.cardId);
      // return response;
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const fetchCardDetail = async () => {
      try {
        const response = await handleCardDetail(item.cardId);
        // console.log("respnose: ", response);
        setCardDetail(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCardDetail();

    // Clean-up 함수를 사용하여 컴포넌트가 unmount 될 때 이펙트 정리
    return () => {
      setCardDetail(null); // 컴포넌트가 unmount 될 때 데이터 초기화
    };
  }, [item.cardId]);

  return (
    <div>
      <div className="grid grid-cols-3 gap-1 text-center">
        {/* 표지 이미지 */}
        <img
          src={item.cover}
          alt={item.title}
          className="col-span-1"
          />
        {/* 책 정보 */}
        <div className="col-span-2">
          <p className="text-xl font-semibold">{cardDetail.title}</p>
          <p>{cardDetail.author}</p>
          <br/>
          {/* 카드 보낸사람 !== 카드 받은사람 -> 유저가 받은 카드일 경우 보낸사람 닉네임 표시 -> 삼항연산자 안먹히네.. */}
          <p>보낸이 {cardDetail.fromId !== memberId && cardDetail.nickname}</p>
          <br/>
          <div className="bg-blue-100 py-3">
            <p>{cardDetail.comment}</p>
          </div>
        </div>
      </div>
      {/* 뒤로가기 버튼(실제로는 컴포넌트 닫기) */}
      <div className="flex justify-center mt-4">
        <button onClick={onClose}>
          <img className="w-7 h-7" src={diaryButton} alt="뒤로가기"/>
        </button>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button onClick={handleDelete}>
          <img className="w-7 h-7" src={deleteButton} alt="삭제하기" />
        </button>
      </div>
    </div>
  );
}

export default Card;