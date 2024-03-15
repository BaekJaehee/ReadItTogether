import React, { useState, useEffect, useRef } from "react";

// 이미지
import logo from "../../assets/navbar/logo.png";

const GuestBook = ({ onClose }) => {
  const [text, setText] = useState("");
  const modalRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    // 여기에 입력된 텍스트를 처리하는 로직을 추가

    console.log(text);
    onClose(); // 모달 닫기
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose(); // 모달 닫기
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-5 rounded w-96" ref={modalRef}>
        <div className="flex justify-between">
          <img className="w-32 mb-4" src={logo} alt="로고" />
          <p className="font-extrabold text-sm">소개글 작성</p>
        </div>
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full h-40 p-2 border rounded resize-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <div className="flex justify-end space-x-2 mt-2">
            <button className="w-full px-4 py-2 bg-blue-500 font-semibold text-white rounded hover:bg-blue-600">
              확 인
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GuestBook;
