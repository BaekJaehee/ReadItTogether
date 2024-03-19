import React, { useState } from "react";
import ReactDOM from "react-dom";

import logo from "../../assets/navbar/logo2.png";
import deleteButton from "../../assets/profile/delete.png";

const FollowModal = ({ isFollowers, onClose }) => {
  const [isFollowingActive, setIsFollowingActive] = useState(false);
  // const [isFollowingActive, setIsFollowingActive] = useState(!isFollowers);

  const handleFollowerClick = () => {
    setIsFollowingActive(false);
  };

  const handleFollowingClick = () => {
    setIsFollowingActive(true);
  };

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
      <div
        className="bg-white w-[400px] h-[400px] rounded-lg p-6 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center text-gray-500 font-semibold text-sm font-serif italic leading-normal">
          <div className="flex">
            <img className="w-5 mr-1" src={logo} alt="로고" />
            <p>Read-it Together</p>
          </div>
          <button onClick={onClose}>
            <img className="w-3" src={deleteButton} alt="X" />
          </button>
        </div>
        <hr className="my-3 border-gray-300" />
        <div>
          <button
            onClick={handleFollowerClick}
            className={`rounded-t-lg text-xs py-2 px-4 mr-1 ${!isFollowingActive ? 'bg-gray-200' : 'bg-white hover:bg-gray-200'}`}
          >
            팔로워
          </button>
          <button
            onClick={handleFollowingClick}
            className={`rounded-t-lg text-xs py-2 px-4 ${isFollowingActive ? 'bg-gray-200' : 'bg-white hover:bg-gray-200'}`}
          >
            팔로잉
          </button>
        </div>
        <div className="max-h-[280px] bg-gray-200 py-0.5 rounded-b-lg rounded-r-lg overflow-y-auto">
          {/* 예시 목록, 실제 팔로워/팔로잉 목록 렌더링 로직에 따라 변경 필요 */}
          <div className="flex justify-between bg-white rounded-md px-2 py-1 m-2">
            <div className="flex items-center">
              <img className="w-7 mr-1" src={logo} alt="" />
              <p className="font-semibold text-sm">닉네임</p>
            </div>
            <button className={`bg-white border w-[70px] border-gray-300 hover:bg-gray-300 hover:text-white rounded-lg text-gray-500 text-xs py-2 px-4 transition-colors duration-300 ${isFollowingActive ? '' : 'hidden'}`}>
              팔로잉
            </button>
            <button className={`bg-white border w-[70px] border-gray-300 hover:bg-gray-300 hover:text-white rounded-lg text-gray-500 text-xs py-2 px-4 transition-colors duration-300 ${!isFollowingActive ? '' : 'hidden'}`}>
              삭제
            </button>
          </div>
          {/* 팔로워/팔로잉 목록 렌더링 반복 */}
          
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default FollowModal;
