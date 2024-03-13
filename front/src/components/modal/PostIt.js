import React from "react";

import TimeSince from "../datetime/TimeSince";

const PostIt = ({ onClose, createdAt }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50"
      onClick={onClose}
    >
      <div
        className="p-5 border w-96 h-96 shadow-lg bg-yellow-200"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          유저 프로필이랑 닉네임 !
        </h3>
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            내용 적는 곳!
          </p>
        </div>
        {/* TimeSince 컴포넌트 사용! */}
        <div className="absolute bottom-0 right-0 p-2">
          <TimeSince createdAt={createdAt} />
        </div>
      </div>
    </div>
  );
};

export default PostIt;
