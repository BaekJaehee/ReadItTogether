import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import PostItLauncher from "../../components/modal/PostIt/PostItLauncher";
import Diary from "../../components/modal/Diary/Diary";
import GuestBook from "../../components/modal/GuestBook";
import MailBox from "../../components/modal/MailBox";

// 이미지
import table from "../../assets/library/table.png";
import bookshelf from "../../assets/library/bookshelf.png";
import post from "../../assets/library/post.png";
import diary from "../../assets/library/diary.png";
import whiteBoard from "../../assets/library/whiteBoard.png";
import mailBox from "../../assets/library/mailBox.png";

const Library = () => {
  // 방명록 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // 다이어리 상태
  const [isDiaryModalOpen, setIsDiaryModalOpen] = useState(false);
  const openDiaryModal = () => setIsDiaryModalOpen(true);
  const closeDiaryModal = () => setIsDiaryModalOpen(false);

  // 소개글 상태
  const [isGuestBookOpen, setIsGuestBookOpen] = useState(false);
  const openGuestBook = () => {
    if (memberId && isMemberPage) {
      setIsGuestBookOpen(true);
    } else {
      console.warn("모달을 열 수 있는 권한이 없습니다.");
    }
  };
  const closeGuestBook = () => setIsGuestBookOpen(false);

  // 우편함 상태
  const [isMailBoxOpen, setIsMailBoxOpen] = useState(false);
  const openMailBox = () => setIsMailBoxOpen(true);
  const closeMailBox = () => setIsMailBoxOpen(false);

  const [memberId, setMemberId] = useState(null);
  const [isMemberPage, setIsMemberPage] = useState(false);

  useEffect(() => {
    const storedMemberId = localStorage.getItem("memberId");
    setMemberId(storedMemberId);

    // URL에서 memberId 추출하기 (예시로, 도메인/library/{memberId} 형태의 URL을 가정)
    const pathArray = window.location.pathname.split("/");
    const memberIdFromURL = pathArray[pathArray.length - 1];

    // 두 memberId가 일치하는지 확인하고, 불일치할 경우 경고 또는 처리
    if (storedMemberId && storedMemberId !== memberIdFromURL) {
      console.warn(
        "URL의 memberId와 로컬 스토리지의 memberId가 일치하지 않습니다."
      );
    }
  }, []);

  return (
    <div className="min-h-screen min-w-full overflow-auto">
      {/* 배경 벽지 */}
      <div className="bg-sky-100 absolute inset-0 min-w-full min-h-full"></div>
      {/* 이미지 */}
      <div className="relative min-w-full min-h-full">
        <img
          className="absolute bottom-0 w-screen h-[500px] min-w-full"
          src={table}
          alt=""
        />
        <div className="group absolute left-52 bottom-40 overflow-hidden">
          <Link to="/bookshelf">
            <img
              className="w-[400px] transform transition-transform duration-500 ease-in-out group-hover:scale-110"
              src={bookshelf}
              alt="책장"
            />
          </Link>
        </div>

        <div className="group absolute right-64 bottom-44 overflow-hidden">
          <button onClick={openDiaryModal}>
            <img
              className="w-[200px] transform transition-transform duration-500 ease-in-out group-hover:scale-110"
              src={diary}
              alt="다이어리"
            />
          </button>
          {isDiaryModalOpen && <Diary onClose={closeDiaryModal} />}
        </div>
        <div className="group flex items-center justify-center overflow-hidden">
          <button onClick={openGuestBook}>
            <img
              className="w-[500px] transform transition-transform duration-500 ease-in-out"
              src={whiteBoard}
              alt="화이트보드"
            />
          </button>
          {isGuestBookOpen && <GuestBook onClose={closeGuestBook} />}
        </div>
        <div className="group flex items-center justify-center  overflow-hidden">
          <button onClick={openMailBox}>
            <img
              className="w-[278px] transform transition-transform duration-500 ease-in-out group-hover:scale-110"
              src={mailBox}
              alt="우편함"
            />
          </button>
          {isMailBoxOpen && <MailBox onClose={closeMailBox} />}
        </div>
        <div className="group absolute right-40 top-20 overflow-hidden">
          <button onClick={openModal}>
            <img
              className="w-[250px] transform transition-transform duration-500 ease-in-out group-hover:scale-110"
              src={post}
              alt="포스트잇"
            />
          </button>
          {isModalOpen && <PostItLauncher onClose={closeModal} />}
        </div>
      </div>
    </div>
  );
};

export default Library;
