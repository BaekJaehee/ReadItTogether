// import React from "react";

// const TimeSince = ({ createdAt }) => {
//   const timeSince = (date) => {
//     const seconds = Math.floor((new Date() - new Date(date)) / 1000);

//     let interval = seconds / 31536000;
//     if (interval > 1) {
//       return Math.floor(interval) + "년 전";
//     }
//     interval = seconds / 2592000;
//     if (interval > 1) {
//       return Math.floor(interval) + "달 전";
//     }
//     interval = seconds / 86400;
//     if (interval > 1) {
//       return Math.floor(interval) + "일 전";
//     }
//     interval = seconds / 3600;
//     if (interval > 1) {
//       return Math.floor(interval) + "시간 전";
//     }
//     interval = seconds / 60;
//     if (interval > 10) {
//       return Math.floor(interval) + "분 전";
//     }
//     return "방금 전";
//   };

//   return (
//     <span className="text-xs text-gray-500">
//       {timeSince(createdAt)}
//     </span>
//   );
// };

// export default TimeSince;