import profileView from "./ProfileView";

const fetchProfileInfo = async () => {
  try {
    const response = await profileView();
    const { profileImage, nickname, email, followList, followerList, evaluatedBookCnt, likedBookCnt, sendCardCnt, genreNoList } = response.data;
    return {
      profileImage,
      nickname,
      email,
      followList,
      followerList,
      evaluatedBookCnt,
      likedBookCnt,
      sendCardCnt,
      genreNoList
    };
  } catch (error) {
    throw new Error("프로필 정보를 가져오는 데 실패했습니다.");
  }
};

export default fetchProfileInfo;