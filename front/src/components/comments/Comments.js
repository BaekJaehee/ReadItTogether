import React from "react";

import img from "../../assets/profile/man.png";
// 댓글 데이터 예시
const comments = [
  {
    id: 1,
    userName: "유저 닉네임",
    rating: 4.5,
    text: "정말 멋진 글입니다!",
  },
  {
    id: 1,
    userName: "유저 닉네임",
    rating: 4.5,
    text: "정말 멋진 글입니다!",
  },
  {
    id: 1,
    userName: "유저 닉네임",
    rating: 4.5,
    text: "정말 멋진 글입니다!",
  },
  {
    id: 1,
    userName: "유저 닉네임",
    rating: 4.5,
    text: "정말 멋진 글입니다!",
  },
  {
    id: 1,
    userName: "유저 닉네임",
    rating: 4.5,
    text: "정말 멋진 글입니다!",
  },
  {
    id: 1,
    userName: "유저 닉네임",
    rating: 4.5,
    text: "정말 멋진 글입니다!",
  },
  {
    id: 1,
    userName: "유저 닉네임",
    rating: 4.5,
    text: "정말 멋진 글입니다!",
  },
  {
    id: 1,
    userName: "유저 닉네임",
    rating: 4.5,
    text: "정말 멋진 글입니다!",
  },
  // 추가적인 댓글 데이터
];

const CommentCard = ({ comment }) => {
  return (
    <div className="flex min-w-[270px] max-h-[350px]">
      <div className="flex flex-col justify-between p-2 bg-sky-100 shadow-lg rounded-lg m-2 w-72 h-80 mb-40">
        <div className="flex justify-between w-full">
          <div className="flex items-center">
            <img className="w-8 h-8 rounded-full mr-2" src={img} alt="프로필" />
            <span className="text-sm font-semibold">{comment.userName}</span>
          </div>
          <div className="flex items-center rounded-lg p-1 bg-white ">
            <span className="text-xs font-bold">⭐ {comment.rating}</span>
          </div>
        </div>
        <div className="p-2 m-2 font-bold text-xs bg-white h-full rounded-lg overflow-y-auto">
          {comment.text}
        </div>
        <div className="flex justify-end w-full">
          <button className="text-xs font-bold bg-white hover:bg-sky-200 p-1 mr-2">수정</button>
          <button className="text-xs font-bold bg-white hover:bg-sky-200 p-1">삭제</button>
        </div>
      </div>
    </div>
  );
};

const Comments = () => {
  return (
    <div className="px-44">
      <h1 className="text-3xl font-bold text-left mb-10 ml-2">
        코멘트 <span className="text-sky-500">+ 90</span>{" "}
      </h1>
      <div className="flex flex-wrap m-2 mb-10"> {/* 여기에 margin을 조정하여 카드 간의 간격을 조절합니다. */}
        {comments.map((comment) => (
          <div className="p-2 w-1/4 min-w-[w-72]"> {/* 카드를 감싸는 div에 너비를 설정합니다. */}
            <CommentCard key={comment.id} comment={comment} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
