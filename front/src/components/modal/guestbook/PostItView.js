import React, { useState, useEffect } from "react";

import GuestBookGet from "../../../api/llibrary/guestbook/GuestBookGet";
import TimeSince from "../../datetime/TimeSince";

// 이미지
import left from "../../../assets/book/left.png";
import right from "../../../assets/book/right.png";

const PostItView = ({
  onClose,
  isMemberPage,
  createdAt,
  onprevPostIt,
  onNextPostIt,
}) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    const getPostItContent = async () => {
      try {
        const response = await GuestBookGet(isMemberPage);
        if (response && response.data) {
          setContent(response.data.content);
        } else {
          console.warn("뭔가 이상함");
        }
      } catch (error) {
        console.log("방명록 데이터 가져오기 실패", error);
      }
    };
    getPostItContent();
  });

  return (
    <div
      className="fixed inset-0 flex items-center justify-center  overflow-y-auto h-full w-full z-40"
      onClick={onClose}
    >
      <div
        className="relative p-5 border w-96 h-96 shadow-lg bg-yellow-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full justify-between">
          <div className="mb-4">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              포스트잇 내용
            </h3>
            <p className="text-sm text-gray-500 mt-2">{content}</p>
          </div>
          <div className="flex justify-between pb-2">
            <button onClick={onprevPostIt}>
              <img className="w-8 rounded-full " src={left} alt="왼쪽" />
            </button>
            <button onClick={onNextPostIt}>
              <img className="w-8 rounded-full" src={right} alt="오른쪽" />
            </button>
          </div>
          <div className="absolute right-0 bottom-0 p-2">
            {/* TimeSince 컴포넌트 사용하여 생성 시간 표시 */}
            <TimeSince createdAt={createdAt} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItView;
