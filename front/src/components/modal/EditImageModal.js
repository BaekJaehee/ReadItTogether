import React, { useState } from "react";
import { changeImage } from "../../api/accounts/ChangeImage";

const EditImageModal = ({ onClose }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [upload, setUpload] = useState(null);

  // const nickname = localStorage.getItem('nickname');
  // const nickname = localStorage.getItem('memberId');
  // 닉네임 어디서 받아오는지 모르겠는데 일단 닉네임이라는 멤버 아이디로 ㄱ
  const nickname = '임규환';  // 닉네임을 기준으로 db에 있는 닉네임의 프로필에 이미지 업데이트

  const onChangeImage = e => {
    const file = e.target.files[0];
    const imgUrl = URL.createObjectURL(file);
    setImageUrl(imgUrl);  // 이미지 주소
    setUpload(file);  // 보낼 이미지(파일형태)
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await changeImage(upload, nickname);
      onClose();
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" onClick={onClose}>
      <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
      <div className="flex items-center justify-center w-full h-full" onClick={(e) => e.stopPropagation()}>
        <div className="bg-white w-[400px] rounded-lg p-6 z-10">
          <form onSubmit={handleImageSubmit} className="flex flex-col gap-4 items-center">
            {/* 이미지 이름 upload 닉네임hidden으로(nickname) */}
            <img alt="profile" src={imageUrl} className="w-auto h-auto"/>
            <input type="file" onChange={onChangeImage} accept="image/*" />
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              이미지 변경
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditImageModal;