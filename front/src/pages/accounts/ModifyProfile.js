import React, { useState } from "react";
import changePassword from "../../api/accounts/ChangePassword";

const ModifyProfile = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    // 새 비밀번호 유효성 검사 필요
    // 이전 비밀번호 db와 비교해서 같은 비밀번호인지 확인 필요
    // 이전 비밀번호 안틀리고 입력했는지 확인 필요

    e.preventDefault();
    try {
      const response = await changePassword(oldPassword, newPassword);
    
      if (!passwordRegExp.test(newPassword)) {
        console.error('비밀번호가 유효하지 않습니다.');
        alert('비밀번호가 유효하지 않습니다.');
        return;
      }

      if (oldPassword === newPassword) {
        console.error("새 비밀번호는 현재 사용중인 비밀번호와 달라야 합니다.");
        alert("새 비밀번호는 현재 사용중인 비밀번호와 달라야 합니다.");
        return;
      }
      console.log(response);
      return response;
      
    } catch (error) {
      console.error(error);
      alert("실패");
    }
  };

  return (
    <div className="flex items-center justify-center pt-32">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="oldPassword">현재 비밀번호</label>
        <input
          type="password"
          value={oldPassword}
          id="oldPassword"
          name="oldPassword"
          onChange={handleOldPasswordChange}
          className="border border-gray-300 px-2 py-1"
        />
        <label htmlFor="newPassword">변경할 비밀번호</label>
        <input
          type="password"
          value={newPassword}
          id="newPassword"
          name="newPassword"
          onChange={handleNewPasswordChange}
          className="border border-gray-300 px-2 py-1"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleSubmit}>
          변경하기
        </button>
      </form>
    </div>
  );
}

export default ModifyProfile;