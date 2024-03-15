import React, { useState } from "react";
import PostIt from "./PostIt"; // 기존 PostIt 컴포넌트

const PostItLauncher = () => {
  const [showButtonsModal, setShowButtonsModal] = useState(true); // 버튼 모달 상태 추가
  const [showPostIt, setShowPostIt] = useState(false);
  const [showWriteForm, setShowWriteForm] = useState(false);
  const [postItContent, setPostItContent] = useState("");

  const handleOpenWriteForm = () => {
    setShowWriteForm(true);
    setShowButtonsModal(false); // 버튼 모달 닫기
    setShowPostIt(false); // 포스트잇 보기 모달 닫기
  };

  const handleOpenPostIt = () => {
    setShowPostIt(true);
    setShowButtonsModal(false); // 버튼 모달 닫기
    setShowWriteForm(false); // 작성 폼 모달 닫기
  };

  const handleCloseAll = () => {
    setShowButtonsModal(false);
    setShowPostIt(false);
    setShowWriteForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 포스트잇 내용 저장 로직
    console.log(postItContent); // 예시로 콘솔에 출력
    setPostItContent(""); // 폼 초기화
    setShowWriteForm(false); // 작성 폼 모달 닫기
    setShowPostIt(true); // 작성된 포스트잇 보기
  };


  return (
    <div>
      {showButtonsModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto h-full w-full z-40"
          onClick={handleCloseAll}
        >
          <div
            className="p-5 border w-96 h-96 shadow-lg bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={handleOpenWriteForm}>포스트잇 작성하기</button>
            <button onClick={handleOpenPostIt}>포스트잇 보러가기</button>
          </div>
        </div>
      )}

      {showWriteForm && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50"
          onClick={handleCloseAll}
        >
          <div
            className="p-5 border w-96 h-96 shadow-lg bg-yellow-200"
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleSubmit}>
              <textarea
                value={postItContent}
                onChange={(e) => setPostItContent(e.target.value)}
                className="w-full h-3/4 p-2 bg-yellow-200 resize-none"
              />
              <button type="submit">방명록 남기기</button>
            </form>
          </div>
        </div>
      )}

      {showPostIt && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto h-full w-full z-60"
          onClick={handleCloseAll}
        >
          <PostIt onClose={handleCloseAll} createdAt={new Date().toISOString()} />
          {/* createdAt을 현재 시간으로 설정하였습니다. 저장된 데이터에 따라 변경해주세요. */}
        </div>
      )}
    </div>
  );
};

export default PostItLauncher;
