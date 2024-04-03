import React, { useEffect, useState } from "react";

import CommentForm from "../../api/book/comment/CommentForm";

const CreateComment = ({ bookId,refreshComments }) => {
  const [commentInput, setCommentInput] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleInput = (e) => {
    setCommentInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
  
    try {
      await CommentForm(bookId, commentInput, rating * 2); // 비동기 생성이 완료된 후
      refreshComments(); // 댓글 목록을 새로 고침
    } catch (error) {
      console.error("댓글 생성 중 오류 발생:", error);
    }
  
    setCommentInput("");
    setRating(0);
  };
  


  const handleMouseEnter = (index) => {
    setHover(index);
  };

  const handleMouseLeave = () => {
    setHover(0);
  };

  const handleClick = (index) => {
    setRating(index);
  };

  return (
    <div className="mt-4 w-[500px]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex mb-2">
          <h3 className="text-2xl mr-2">평점</h3>
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1;
              return (
                <div
                  key={index}
                  className={`star ${
                    ratingValue <= (hover || rating)
                      ? "text-sky-400"
                      : "text-gray-400"
                  }`}
                  onClick={() => handleClick(ratingValue)}
                  onMouseEnter={() => handleMouseEnter(ratingValue)}
                  onMouseLeave={handleMouseLeave}
                >
                  &#9733;
                </div>
              );
            })}
          </div>
        </div>
        <hr className="border-t-2 border-sky-400" />
        <textarea
          className="customFont min-h-[100px] resize-none border rounded-md p-2 border-sky-400"
          placeholder="내용을 입력하세요..."
          value={commentInput}
          onChange={handleInput}
          maxLength={120}
        ></textarea>
        <button
          type="submit"
          className="self-end px-4 py-2 bg-sky-400 text-white rounded hover:bg-sky-500 disabled:opacity-50"
        >
          평가 하기
        </button>
      </form>
    </div>
  );
};

export default CreateComment;
