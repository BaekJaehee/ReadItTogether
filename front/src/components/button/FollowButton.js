import React from "react";

import FollowForm from "../../api/follow/FollowForm";
import FollowDelete from "../../api/follow/FollowDelete";

const requestId = localStorage.getItem("memberId");

const FollowButton = ({ isFollowing, targetEmail }) => {
  const handleFollow = () => {
    FollowForm(targetEmail, requestId);
  };

  const handleUnfollow = () => {
    FollowDelete(targetEmail, requestId);
  };

  return (
    <div>
      {isFollowing === 1 ? (
        <button
          className="bg-pink-100 text-sm font-bold px-2 py-1 rounded-md"
          onClick={handleUnfollow}
        >
          팔로우 취소
        </button>
      ) : (
        <button
          className="bg-pink-100 text-sm font-bold px-2 py-1 rounded-md"
          onClick={handleFollow}
        >
          팔로우
        </button>
      )}
    </div>
  );
};

export default FollowButton;
