import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import PostItLauncher from "../../components/modal/guestbook/PostItLauncher";
import Diary from "../../components/modal/Diary/Diary";
import Intro from "../../components/modal/Intro";
import MailBox from "../../components/modal/MailBox";
import sample from "../../assets/profile/sample.PNG";

import IntroGet from "../../api/llibrary/intro/IntroGet";
import FollowButton from "../../components/button/FollowButton";
import FollowModal from "../../components/modal/FollowModal";

// 이미지
import table from "../../assets/library/table.png";
import bookshelf from "../../assets/library/bookshelf.png";
import post from "../../assets/library/post.png";
import diary from "../../assets/library/diary.png";
import whiteBoard from "../../assets/library/whiteBoard.png";
import mailBox from "../../assets/library/mailBox.png";
import list from "../../assets/list.png";

const memberId = localStorage.getItem("memberId");
const Library = () => {
  const location = useLocation();
  const [introText, setIntroText] = useState("");
  const [isMemberPage, setIsMemberPage] = useState(false);
  const [profileImg, setProfileImg] = useState(`${sample}`);
  const [nickname, setNickname] = useState("");
  const [followingNum, setFollowingNum] = useState("");
  const [followerNum, setFollowerNum] = useState("");
  const [isFollowing, setIsFollowing] = useState(0);
  const [email, setEmail] = useState("");
  const [followingList, setFollowingList] = useState([]);
  const [followerList, setFollowerList] = useState([]);

  useEffect(() => {
    // URL에서 whoMemberId 추출
    const pathArray = location.pathname.split("/");
    const whoMemberId = pathArray[pathArray.length - 1];

    // 현재 페이지의 사용자 ID 업데이트
    setIsMemberPage(whoMemberId);

    // 소개글 가져오기
    const fetchIntroText = async () => {
      try {
        const response = await IntroGet(whoMemberId);
        setIntroText(response.intro);
        setEmail(response.email);
        setNickname(response.nickname);
        setProfileImg(response.profileImage);
        setIsFollowing(response.isFollowing);
        setFollowingNum(response.followingNum);
        setFollowerNum(response.followerNum);
        setFollowingList(response.followingList);
        setFollowerList(response.followerList);
      } catch (error) {
        console.error("소개글을 가져오는 데 실패했습니다:", error);
      }
    };

    fetchIntroText();
  }, [location.pathname]); // 의존성 배열에 location.pathname 추가

  // 방명록 상태
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // 다이어리 상태
  const [isDiaryModalOpen, setIsDiaryModalOpen] = useState(false);
  const openDiaryModal = () => setIsDiaryModalOpen(true);
  const closeDiaryModal = () => setIsDiaryModalOpen(false);

  // 소개글 상태
  const [isIntroOpen, setIsIntroOpen] = useState(false);
  const openIntro = () => {
    if (memberId === isMemberPage) {
      setIsIntroOpen(true);
    } else {
      console.warn("모달을 열 수 있는 권한이 없습니다.");
    }
  };
  const closeIntro = () => setIsIntroOpen(false);

  // 우편함 상태
  const [isMailBoxOpen, setIsMailBoxOpen] = useState(false);
  const openMailBox = () => setIsMailBoxOpen(true);
  const closeMailBox = () => setIsMailBoxOpen(false);

  //팔로우 목록 상태
  const [followModalOpen, setFollowModalOpen] = useState(false);
  const openFollowModal = () => setFollowModalOpen(true);
  const closeFollowModal = () => setFollowModalOpen(false);

  return (
    <div className="min-h-screen min-w-full overflow-auto">
      {/* 배경 벽지 */}
      <div className="bg-sky-100 absolute inset-0 min-w-full min-h-full"></div>

      {/* 이미지 */}
      <div className="relative min-w-full min-h-full">
        <img
          className="absolute bottom-0 w-screen h-[500px] min-w-full"
          src={table}
          alt="책상"
        />
        <div className="group absolute left-52 bottom-40 overflow-hidden">
          <Link to={`/bookshelf/${isMemberPage}`}>
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
          <button onClick={openIntro}>
            <div className="relative">
              <img
                className="w-[500px] transform transition-transform duration-500 ease-in-out"
                src={whiteBoard}
                alt="소개글"
              />
              <div className="w-[300px] absolute top-0 left-24 right-0 bottom-0 flex items-center justify-center">
                {introText && (
                  <p className="font-semibold text-xl">{introText}</p>
                )}
              </div>
            </div>
          </button>
          {isIntroOpen && (
            <Intro
              onClose={closeIntro}
              onUpdate={(updatedText) => setIntroText(updatedText)}
              introText={introText}
            />
          )}
        </div>
        <div className=" absolute left-52 top-24 overflow-hidden">
          <div className="relative">
            <img
              className="w-[300px] transform transition-transform duration-500 ease-in-out group-hover:scale-110"
              src={list}
              alt="서재 주인 정보"
            />
            <div className="absolute top-5 left-5">
              <div
                className="flex items-center cursor-pointer"
                onClick={openFollowModal}
              >
                <img
                  className="w-8 h-8 rounded-full mr-1"
                  src={profileImg}
                  alt="프로필 사진"
                />
                <p className="font-bold text-lg">{nickname}</p>
              </div>
            </div>
            <div className="absolute top-14 left-12 text-sm font-mono">
              <p className="flex">안녕! 나는 {followingNum}명을 팔로우중이고</p>
              <p>{followerNum}명이 나를 팔로우 중이지!</p>
              <p>나랑 친구할래?</p>
            </div>
            {memberId !== isMemberPage && (
              <div className="absolute bottom-5 right-4">
                <FollowButton isFollowing={isFollowing} targetEmail={email} />
              </div>
            )}
          </div>

          {followModalOpen && (
            <FollowModal
              onClose={closeFollowModal}
              followList={followingList}
              followerList={followerList}
            />
          )}
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
          {isModalOpen && (
            <PostItLauncher
              onClose={closeModal}
              isMemberPage={isMemberPage}
              memberId={memberId}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Library;
