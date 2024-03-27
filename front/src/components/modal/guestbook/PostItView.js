import React, { useState, useEffect } from "react";

import GuestBookGet from "../../../api/llibrary/guestbook/GuestBookGet";

// 이미지
import left from "../../../assets/book/left.png";
import right from "../../../assets/book/right.png";

const PostItView = ({ onClose, postId, moveLeft, moveRight }) => {
  const [nickname, setNickname] = useState("");
  const [profileImg, setProfileImg] = useState(null);
  const [content, setContent] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  useEffect(() => {
    const getPostItContent = async () => {
      console.log("왜안대냐고 ");
      try {
        const response = await GuestBookGet(postId);
        setProfileImg(response.data.data.profileImg);
        setNickname(response.data.data.nickname);
        setContent(response.data.data.content);
        setCreatedAt(response.data.data.createdAt);
      } catch (error) {
        console.log("방명록 데이터 가져오기 실패", error);
      }
    };
    getPostItContent();
  }, [postId]);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center overflow-y-auto h-full w-full z-40"
      onClick={onClose}
    >
      <div
        className="relative p-5 border w-96 h-96 shadow-lg bg-yellow-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full justify-between">
          <div className="flex items-center mb-4">
            <img
              className="w-8 rounded-full"
              src={profileImg}
              alt="프로필사진"
            />
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              {nickname}
            </h3>
            <p className="text-sm text-gray-500 mt-2">{content}</p>
          </div>
          <div className="flex justify-between pb-2">
            <button onClick={moveLeft}>
              <img className="w-8 rounded-full " src={left} alt="왼쪽" />
            </button>
            <button onClick={moveRight}>
              <img className="w-8 rounded-full" src={right} alt="오른쪽" />
            </button>
          </div>
          <div className="absolute right-0 bottom-0 p-2">{createdAt}</div>
        </div>
      </div>
    </div>
  );
};

export default PostItView;
