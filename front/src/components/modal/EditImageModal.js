import React, { useState } from "react";

const EditImageModal = ({ onClose }) => {
  const [uploadedImage, setUploadedImage] = useState(null);

  const onChangeImage = e => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);
  };

  const handleImageSubmit = async () => {
    try {
      // 이미지 변경 api 만들어야 될듯
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" onClick={onClose}>
      <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
      <div className="flex items-center justify-center w-full h-full" onClick={(e) => e.stopPropagation()}>
        <div className="bg-white w-[400px] rounded-lg p-6 z-10">
          <div className="flex flex-col gap-4 items-center">
            <img alt="profile" src={uploadedImage} className="w-auto h-auto"/>
            <input type="file" onChange={onChangeImage}/>
            <button onClick={handleImageSubmit} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              이미지 변경
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditImageModal;