import React, { useState, useEffect, useNavigate } from "react";

import FollowModal from "../../components/modal/FollowModal";

import man from "../../assets/profile/man.png";
import grahp from "../../assets/profile/grahp.png";
import settings from "../../assets/profile/settings.png";

const Profile = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [memberId, setMemberId] = useState(null);

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
  
  const handleSettingsClick = () => {
    navigate(`/modify/${memberId}`);
  };

  return (
    <div className="flex items-center justify-center pt-32">
      <div className="flex items-center justify-center bg-sky-100 w-[1000px] p-12">
        <div className="flex bg-white w-[900px] p-6 flex-col">
          {/* 유저 정보와 그래프 */}
          <div className="flex">
            {/* 유저 정보 */}
            <div className="flex-1">
              <div>
                <img
                  className="w-52 h-52 rounded-full mb-2"
                  src={man}
                  alt="헤키레키 잇센"
                />
              </div>
              <p className="font-semibold text-xl mb-2"> 닉네임 </p>
              <p className="underline text-gray-500 text-xs mb-2">
                example@naver.com
              </p>
              {/* 팔로우 수 */}
              <button onClick={() => setIsModalOpen(true)}>
                <div className="flex">
                  {/* 팔로잉 */}
                  <div className="flex mr-2">
                    <p className="text-gray-500 mr-2">팔로잉</p>
                    <p className="font-semibold">137</p>
                  </div>
                  {/* 팔로워 */}
                  <div className="flex">
                    <p className="text-gray-500 mr-2">팔로워</p>
                    <p className="font-semibold">936</p>
                  </div>
                </div>
              </button>
              {isModalOpen && (
                <FollowModal
                  isFollowers={true}
                  onClose={() => setIsModalOpen(false)}
                />
              )}
            </div>

            {/* 그래프 넣는 곳 */}
            <div className="flex-1">
              <img src={grahp} alt="임시 그래프" />
            </div>
            {/* 설정 톱니바퀴 */}
            <div className="relative right-0" onClick={ handleSettingsClick }>
              <img className="w-5" src={settings} alt="" />
            </div>
          </div>

          {/* hr 태그와 '내가 읽은 책' 텍스트 */}
          <div className="mt-4">
            <hr />
            <div className="flex justify-between mt-4 mx-10 font-semibold text-sm">
              <div className="flex-col">
                <p>평가 완료한 책</p>
                <p className="flex items-center justify-center text-2xl">136</p>
              </div>
              <div className="flex-col">
                <p>관심 있는 책</p>
                <p className="flex items-center justify-center text-2xl">29</p>
              </div>
              <div className="flex-col">
                <p>내가 쓴 카드</p>
                <p className="flex items-center justify-center text-2xl">12</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
