import React, { useState } from "react";
import WriteFormModal from "./PostItWriteForm"; // PostIt 작성 컴포넌트
import PostIt from "./PostItView"; // PostIt 컴포넌트

// 이미지
import postIt from "../../assets/library/post-it.png";
import pen from "../../assets/library/pen.png";

const PostItLauncher = ({ onClose }) => {
  const [modalState, setModalState] = useState({
    showButtonsModal: true,
    showPostIt: false,
    showWriteForm: false,
  });
  const [postItContent, setPostItContent] = useState("");

  // 여기에서 modalState의 각 속성을 구조 분해 할당합니다.
  const { showButtonsModal, showPostIt, showWriteForm } = modalState;

  const setModal = ({ showButtonsModal, showPostIt, showWriteForm }) => {
    setModalState({ showButtonsModal, showPostIt, showWriteForm });
  };

  const handleOpenWriteForm = () => {
    setModal({
      showButtonsModal: false,
      showPostIt: false,
      showWriteForm: true,
    });
  };

  const handleOpenPostIt = () => {
    setModal({
      showButtonsModal: false,
      showPostIt: true,
      showWriteForm: false,
    });
  };

  const handleCloseAll = () => {
    setModal(
      {
        showButtonsModal: false,
        showPostIt: false,
        showWriteForm: false,
      },
      onClose()
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(postItContent); // 포스트잇 내용 콘솔에 출력
    setPostItContent(""); // 폼 초기화
    setModal({
      showButtonsModal: false,
      showPostIt: true,
      showWriteForm: false,
    }); // 작성 폼 모달 닫고, 포스트잇 보기
  };
  return (
    <div>
      {showButtonsModal && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto h-full w-full z-40"
          onClick={handleCloseAll}
        >
          <div
            className="flex flex-col items-center justify-center p-5 border w-96 h-96 shadow-lg bg-yellow-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4">
              {" "}
              {/* 버튼 간의 간격을 주기 위해 marginBottom 추가 */}
              <button
                onClick={handleOpenWriteForm}
                className="flex flex-col items-center"
              >
                {" "}
                {/* 버튼 내용을 세로로 배열 */}
                <img className=" w-20 mb-2" src={pen} alt="작성" />{" "}
                {/* 이미지와 텍스트 사이에 간격 추가 */}
                포스트잇 작성하기
              </button>
            </div>
            <div>
              <button
                onClick={handleOpenPostIt}
                className="flex flex-col items-center"
              >
                {" "}
                {/* 버튼 내용을 세로로 배열 */}
                <img className="w-20 mb-2" src={postIt} alt="보기" />{" "}
                {/* 이미지와 텍스트 사이에 간격 추가 */}
                포스트잇 보러가기
              </button>
            </div>
          </div>
        </div>
      )}

      {showWriteForm && (
        <WriteFormModal
          postItContent={postItContent}
          setPostItContent={setPostItContent}
          handleSubmit={handleSubmit}
          handleCloseAll={handleCloseAll}
        />
      )}

      {showPostIt && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto h-full w-full z-60"
          onClick={handleCloseAll}
        >
          <PostIt
            onClose={handleCloseAll}
            createdAt={new Date().toISOString()}
          />
          {/* createdAt을 현재 시간으로 설정하였습니다. 저장된 데이터에 따라 변경해주세요. */}
        </div>
      )}
    </div>
  );
};

export default PostItLauncher;
