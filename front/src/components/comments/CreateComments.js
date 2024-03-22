import React, { useState } from "react";

const CreateComments = () => {
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState("");

  const handleInput = (e) => {
    setCommentInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentInput.trim()) return; // 빈 댓글은 추가하지 않음
    setComments([...comments, commentInput]);
    setCommentInput(""); // 입력 필드 초기화
  };

  return (
    <div className="mt-4 w-[500px]">
      <div className="border-t-2 border-sky-400 pt-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <textarea
            className="min-h-[100px] resize-none border rounded-md p-2 border-sky-400"
            placeholder="내용을 입력하세요..."
            value={commentInput}
            onChange={handleInput}
            disabled={comments.length >= 10} // 최대 댓글 수 제한 예시
          ></textarea>
          <button
            type="submit"
            className="self-end px-4 py-2 bg-sky-400 text-white rounded hover:bg-sky-500 disabled:opacity-50"
            disabled={!commentInput.trim() || comments.length >= 10} // 입력이 없거나 최대 댓글 수에 도달했을 때 비활성화
          >
            평가 하기
          </button>
        </form>
        <ul className="mt-4">
          {comments.map((comment, index) => (
            <li key={index} className="mt-2 bg-sky-100 p-2 rounded">
              {comment}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CreateComments;
