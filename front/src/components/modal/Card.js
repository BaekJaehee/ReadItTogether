import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import handleCardDetail from "../../api/card/HandleCardDetail";
import handleCardDelete from "../../api/card/HandleCardDelete";

import diaryButton from "../../assets/library/diaryButton.png";
import deleteButton from "../../assets/library/deleteButton.png";

const Card = ({ item, onClose, onDelete }) => {
  const [cardDetail, setCardDetail] = useState(""); // 형식 제발 null로 하지말고
  const memberId = localStorage.getItem("memberId")
  const navigate = useNavigate();
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

  const goToDetail = (bookId) => {
    navigate(`/detail-book/${bookId}`);
  }

  const goToUser = (userId) => {
    navigate(`/${userId}`);
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
      <div className="grid grid-cols-2 gap-1">
        {/* 표지 이미지 */}
        {cardDetail.cover && (
          <img
            src={cardDetail.cover}
            alt=""
            className="col-span-1 cursor-pointer mx-auto w-[280px] h-[380px] object-cover rounded-lg"
            // onClick={goToDetail(cardDetail.bookId)}
            />
        )}
        {/* 책 정보 */}
        <div className="col-span-1">
          <p className="text-xl font-semibold mb-1">{cardDetail.title}</p>
          <p className="mb-1">{cardDetail.author}</p>
          <div className="h-[200px] overflow-auto rounded-md border-solid border-[1px] border-black-300">
            {cardDetail?.content?.split('<br/>').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </div>
          <br/>
          <Link to=`/${cardDetail.fromId}`>
          <div className="flex my-1">
            <img className="w-8 h-8 mr-2 rounded-full" src={cardDetail.profile} alt="프로필 이미지" />
            <span className="cursor-pointer">{cardDetail.nickname}</span>
          </div>
          </Link>
          <div className="bg-blue-100 py-3 rounded-lg">
            <p className="mx-3">{cardDetail.comment}</p>
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