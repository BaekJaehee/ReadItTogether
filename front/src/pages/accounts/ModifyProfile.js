import React, { useState, useEffect } from "react";
import changePassword from "../../api/accounts/ChangePassword";
import changeNickname from "../../api/accounts/ChangeNickname";
import { checkNicknameDuplicate } from "../../api/accounts/NicknameDuplicate";

const ModifyProfile = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [newNickname, setNewNickname] = useState('');

  const [isPasswordOK, setIsPasswordOK] = useState(false);
  const [isNicknameOK, setIsNicknameOK] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(false);

  const [passwordStatusMessage, setPasswordStatusMessage] = useState('');
  const [passwordConfirmStatusMessage, setPasswordConfirmStatusMessage] = useState('');
  const [nicknameStatusMessage, setNicknameStatusMessage] = useState('');
  const [nicknameStatusMessageClassName, setNicknameStatusMessageClassName] = useState('');

  const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
  const nicknameRegExp = /^[가-힣a-zA-Z0-9]{2,8}$/;

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  // const handleNewPasswordChange = (e) => {
  //   setNewPassword(e.target.value);
  //   setIsPasswordOK(passwordRegExp.test(e.target.value));
  //   setIsPasswordMatch(e.target.value === newPasswordConfirm && e.target.value !== oldPassword);
  //   setPasswordStatusMessage('');
  // };

  // const handleNewPasswordConfirmChange = (e) => {
  //   setNewPasswordConfirm(e.target.value);
  //   setIsPasswordMatch(e.target.value === newPassword && e.target.value !== oldPassword);
  //   setPasswordConfirmStatusMessage('');
  // };

  const handleNewPasswordChange = (e) => {
    const { value } = e.target;
    setNewPassword(value);
    setIsPasswordOK(passwordRegExp.test(value));
    setIsPasswordMatch(value === newPasswordConfirm && value !== oldPassword);
    setPasswordStatusMessage(passwordRegExp.test(value) ? '' : '비밀번호는 8~20자 사이의 영문, 숫자, 특수문자 조합이어야 합니다.');
  };
  
  const handleNewPasswordConfirmChange = (e) => {
    const { value } = e.target;
    setNewPasswordConfirm(value);
    setIsPasswordMatch(value === newPassword && value !== oldPassword);
    setPasswordConfirmStatusMessage(value === newPassword ? '' : '비밀번호가 일치하지 않습니다.');
  };

  const handleNewNicknameChange = (e) => {
    setNewNickname(e.target.value);
    setIsNicknameOK(nicknameRegExp.test(e.target.value));
    setNicknameStatusMessage('');
  }

  const handleCheckNickname = async () => {
    try {
      const isDuplicate = await checkNicknameDuplicate(newNickname);
      setIsNicknameDuplicate(!isDuplicate);
      setNicknameStatusMessage(!isDuplicate ? '중복된 닉네임입니다.' : '사용 가능한 닉네임입니다.');
      setNicknameStatusMessageClassName(!isDuplicate ? 'text-sm text-red-500' : 'text-sm text-blue-500')
    } catch (error) {
      console.log(error);
    };
  };

  useEffect(() => {
    const isValid = oldPassword && newPassword && newPasswordConfirm && (newPassword === newPasswordConfirm)
    setIsPasswordOK(isValid);
  }, [oldPassword, newPassword, newPasswordConfirm])

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      // if (!isPasswordOK) {
      //   setPasswordStatusMessage('비밀번호는 8~20자 사이의 영문, 숫자, 특수문자 조합이어야 합니다.');
      //   return;
      // }
      // if (!isPasswordMatch) {
      //   setPasswordConfirmStatusMessage('비밀번호가 일치하지 않습니다.');
      //   return;
      // }
      const response = await changePassword(oldPassword, newPassword);
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
      alert("실패");
    }
  };

  const handleNicknameSubmit = async (e) => {
    e.preventDefault();
    try {
      // if (!isNicknameOK) {
      //   setNicknameStatusMessage('닉네임은 2~8자 사이의 한글, 영문, 숫자 조합이어야 합니다.');
      //   return;
      // }
      // if (!isNicknameDuplicate) {
      //   setNicknameStatusMessage('중복된 닉네임입니다.');
      //   return;
      // }
      const response = await changeNickname(newNickname);
      console.log(response);
      return response;
    } catch (error) {
      console.error(error);
      alert("실패");
    }
  };

  return (
    <div className="flex items-center justify-center pt-32">
      <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4">
        <label htmlFor="oldPassword">현재 비밀번호</label>
        <input
          type="password"
          value={oldPassword}
          onChange={handleOldPasswordChange}
          className="border border-gray-300 px-2 py-1"
        />
        <label htmlFor="newPassword">새로운 비밀번호</label>
        <input
          type="password"
          value={newPassword}
          onChange={handleNewPasswordChange}
          className="border border-gray-300 px-2 py-1"
        />
        {/* 비밀번호 메시지 */}
        <p className="text-sm text-red-500">{passwordStatusMessage}</p>
        {/* 새 비밀번호 확인 */}
        <label htmlFor="newPasswordConfirm">새로운 비밀번호 확인</label>
        <input
          type="password"
          value={newPasswordConfirm}
          onChange={handleNewPasswordConfirmChange}
          className="border border-gray-300 px-2 py-1"
        />
        {/* 비밀번호 확인 메시지 */}
        <p className="text-sm text-red-500">{passwordConfirmStatusMessage}</p>
        {/* 비밀번호 변경 버튼 */}
        <button type="submit" disabled={!isPasswordOK || !isPasswordMatch} className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${(!isPasswordOK || !isPasswordMatch) && 'opacity-50 cursor-not-allowed'}`}>
          비밀번호 변경
        </button>
      </form>
      <form onSubmit={handleNicknameSubmit} className="flex flex-col gap-4 ml-8">
        {/* 새 닉네임 */}
        <label htmlFor="newNickname">새로운 닉네임</label>
        <input
          type="text"
          value={newNickname}
          onChange={handleNewNicknameChange}
          className="border border-gray-300 px-2 py-1"
        />
        {/* 닉네임 중복확인 */}
        <button type="button" onClick={handleCheckNickname} className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${isNicknameOK && !isNicknameDuplicate ? '' : 'opacity-50 cursor-not-allowed'}`}>
          중복 확인
        </button>
        {/* 닉네임 상태 메시지 */}
        <p className={nicknameStatusMessageClassName}>{nicknameStatusMessage}</p>
        {/* 닉네임 변경 버튼 */}
        <button type="submit" disabled={!isNicknameOK || !isNicknameDuplicate} className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${(!isNicknameOK || !isNicknameDuplicate) && 'opacity-50 cursor-not-allowed'}`}>
          닉네임 변경
        </button>
      </form>
      <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
        탈퇴하기
      </button>
    </div>
  );
}

export default ModifyProfile;
