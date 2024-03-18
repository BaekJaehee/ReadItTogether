import React, { useState } from "react";

const MailBox = ({ onClose }) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50"
      onClick={onClose}
    >
      <div className="bg-white rounded-lg p-8 w-[55%] h-[70%] overflow-y-auto">
        <h1 className="text-xl font-medium leading-6 text-gray-900 text-center my-5">우편함</h1>
      </div>
    </div>
  );
}

export default MailBox