import React, { useState } from "react";
import { Link } from "react-router-dom";

import PostIt from "../../components/modal/PostIt";
import Diary from "../../components/modal/Diary";

import table from "../../assets/library/table.png";
import bookshelf from "../../assets/library/bookshelf.png";
import post from "../../assets/library/post.png";
import diary from "../../assets/library/diary.png";
import whiteBoard from "../../assets/library/whiteBoard.png";
import mailBox from "../../assets/library/mailBox.png";

const Library = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDiaryModalOpen, setIsDiaryModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openDiaryModal = () => setIsDiaryModalOpen(true);
  const closeDiaryModal = () => setIsDiaryModalOpen(false);

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
          <Link to="/">
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
              className="w-[300px] transform transition-transform duration-500 ease-in-out group-hover:scale-110"
              src={post}
              alt="포스트잇"
            />
          </button>
          {isModalOpen && <PostIt onClose={closeModal} />}
        </div>
        <div className="group absolute right-64 bottom-36 overflow-hidden">
          <button onClick={openDiaryModal}>
            <img
              className="w-[230px] transform transition-transform duration-500 ease-in-out group-hover:scale-110"
              src={diary}
              alt="다이어리"
            />
          </button>
          {isDiaryModalOpen && <Diary onClose={closeDiaryModal}/>}
        </div>
        <div className="group flex items-center justify-center overflow-hidden">
          <Link to="/">
            <img
              className="w-[500px] transform transition-transform duration-500 ease-in-out"
              src={whiteBoard}
              alt="화이트보드"
            />
          </Link>
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
