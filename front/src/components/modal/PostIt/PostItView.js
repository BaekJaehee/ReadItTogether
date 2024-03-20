import React from "react";

import TimeSince from "../../datetime/TimeSince";

const PostItView = ({ onClose, postItContent, createdAt }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center  overflow-y-auto h-full w-full z-40"
      onClick={onClose}
    >
      <div
        className="relative p-5 border w-96 h-96 shadow-lg bg-yellow-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full justify-between">
          <div className="mb-4">
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              포스트잇 내용
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              {postItContent}
            </p>
          </div>
          <div className="absolute right-0 bottom-0 p-2">
            {/* TimeSince 컴포넌트 사용하여 생성 시간 표시 */}
            <TimeSince createdAt={createdAt} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItView;
