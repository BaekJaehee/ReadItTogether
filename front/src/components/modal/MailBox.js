import React, { useState, useEffect } from "react";
import handleGetPost from "../../api/postbox/HandleGetPost";
import handleSavePost from "../../api/postbox/HandleSavePost";
import Card from "./Card";

const MailBox = ({ onClose, onCardOpen, onCardClose }) => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postData = await handleGetPost();
        setData(postData.data.cards);
      } catch (error) {
        console.error("카드 데이터를 불러오는 데 실패했습니다:", error);
      }
    };

    fetchData();
  }, []);

  const openCard = (item) => {
    setSelectedItem(item);
    if (typeof onCardOpen === "function") {
      onCardOpen();
    }
  };

  const closeCard = () => {
    setSelectedItem(null);
    if (typeof onCardClose === "function") {
      onCardClose();
    }
  };

  const savePost = async (cardId) => {
    try {
      await handleSavePost(cardId);
      alert("카드 저장이 완료되었습니다.");
      onClose();
      // const updatedData = await handleGetPost(); // 저장 후 데이터 다시 불러오기
      // setData(updatedData.data.cards); // 모달에 반영
      // console.log("카드 저장이 완료되었습니다.");
    } catch (error) {
      console.error("카드 저장 중 오류가 발생했습니다:", error);
    }
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50"
      onClick={onClose}
    >
      <div className="bg-white rounded-lg p-8 w-[55%] h-[55%] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <h1 className="text-xl font-medium leading-6 text-gray-900 text-center my-5">금주의 추천 카드</h1>
        {selectedItem ? (
          <Card item={selectedItem} onClose={closeCard} />
        ) : (
          <>
            {data.length === 0 ? (
              <p className="text-center text-gray-500 mt-32">우편함이 비어있습니다</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {data.map((item) => (
                  <div key={item.cardId} className="text-center cursor-pointer" onClick={() => openCard(item)}>
                    <img src={item.cover} alt={`Card ${item.cardId}`} className="mx-auto w-32 h-52 object-cover rounded-lg" />
                    <button className="bg-sky-500 text-white mt-2 px-2 py-1 rounded-md" onClick={() => savePost(item.cardId)}>저장</button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MailBox;
