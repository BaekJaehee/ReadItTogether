import React, { useState } from "react";
import { Link } from "react-router-dom";

import PostIt from "../../components/modal/PostIt";
import PostItLauncher from "../../components/modal/PostItLauncher";
import Diary from "../../components/modal/Diary";
import GuestBook from "../../components/modal/GuestBook";

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
  const openGuestBook = () => setIsGuestBookOpen(true);
  const closeGuestBook = () => setIsGuestBookOpen(false);

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
          <Link to="/">
            <img
              className="w-[278px] transform transition-transform duration-500 ease-in-out group-hover:scale-110"
              src={mailBox}
              alt="우편함"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Library;
