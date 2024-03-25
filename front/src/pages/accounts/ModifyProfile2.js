import React, { useState, useEffect } from "react";
import changePassword from "../../api/accounts/ChangePassword";
import changeNickname from "../../api/accounts/ChangeNickname";
import { checkNicknameDuplicate } from "../../api/accounts/NicknameDuplicate";


const ModifyProfile = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newNickname, setNewNickname] = useState('');
  const [currentNickname, setCurrentNickname] = useState('');

  const [isPasswordOK, setIsPasswordOK] = useState(false);
  const [isNicknameOK, setIsNicknameOK] = useState(false);

  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordStatusMessage, setPasswordStatusMessage] = useState('');
  const [passwordStatusMessageClassName, setPasswordStatusMessageClassName] = useState('');
  const [passwordConfirmStatusMessage, setPasswordConfirmStatusMessage] = useState('');
  const [passwordConfirmStatusMessageClassName, setPasswordConfirmStatusMessageClassName] = useState('');

  // 닉네임 중복 검사
  const [isCorrectNickname, setIsCorrectNickname] = useState(false);
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [nicknameStatusMessage, setNicknameStatusMessage] = useState('');
  const [nicknameStatusMessageClassName, setNicknameStatusMessageClassName] = useState('');


  const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
  const nicknameRegExp = /^[가-힣a-zA-Z0-9]{2,8}$/;

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
    setIsPasswordValid(false);
  };

  const handleNewNicknameChange = (e) => {
    setNewNickname(e.target.value);
    setIsNicknameValid(false);
  }

  useEffect(() => {
    const passwordRegExp = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    const isValid = newPassword && passwordRegExp.test(newPassword)
    setIsPasswordOK(isValid);
  }, [newPassword])
  
  useEffect(() => {
    const nicknameRegExp = /^[가-힣a-zA-Z0-9]{2,8}$/;
    const isValid = newNickname && nicknameRegExp.test(newNickname);
    setIsNicknameOK(isValid);
  }, [newNickname])
  
  const handleCheckNickname = async () => {
    try {
      const isNicknameDuplicate = await checkNicknameDuplicate(newNickname);
      setIsNicknameValid(isNicknameDuplicate);
      setNicknameStatusMessage(!isNicknameDuplicate ? '중복된 닉네임입니다.' : '사용 가능한 닉네임입니다.');
      setNicknameStatusMessageClassName(!isNicknameDuplicate ? 'text-sm text-red-500' : 'text-sm text-blue-500');
    } catch (error) {
      console.log(error);
    };
  };

  const handlePasswordSubmit = async (e) => {
    // 새 비밀번호 유효성 검사 필요
    // 이전 비밀번호 db와 비교해서 같은 비밀번호인지 확인 필요
    // 이전 비밀번호 안틀리고 입력했는지 확인 필요 -> oldPassword가 db에 저장된 비밀번호가 다르면 200은 뜨는데 비밀번호 못써서 계정 버려야됨

    e.preventDefault();
    try {
      const response = await changePassword(oldPassword, newPassword);
    
      // if (!passwordRegExp.test(newPassword)) {
      //   console.error('비밀번호가 유효하지 않습니다.');
      //   alert('비밀번호가 유효하지 않습니다.');
      //   return;
      // }

      // if (oldPassword === newPassword) {
      //   console.error("새 비밀번호는 현재 사용중인 비밀번호와 달라야 합니다.");
      //   alert("새 비밀번호는 현재 사용중인 비밀번호와 달라야 합니다.");
      //   return;
      // }
      console.log(response);
      return response;
      
    } catch (error) {
      console.error(error);
      alert("실패");
    }
  };

  const handleNicknameSubmit = async (e) => {
    // 새 닉네임 이전 닉네임과 달라야함
    // 새 닉네임 유효성 검사 + 중복검사

    e.preventDefault();
    try {
      const response = await changeNickname(newNickname);

      // if (!nicknameRegExp.test(newNickname)) {
      //   console.error('닉네임이 유효하지 않습니다.');
      //   alert('닉네임이 유효하지 않습니다.');
      //   return;
      // }

      // if (currentNickname === newNickname) {
      //   console.error("새 닉네임은 현재 사용중인 닉네임과 달라야 합니다.");
      //   alert("새 닉네임은 현재 사용중인 닉네임과 달라야 합니다.");
      //   return;
      // }
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
        {/* 현재 비밀번호 */}
        <label htmlFor="oldPassword">현재 비밀번호</label>
        <input
          type="password"
          value={oldPassword}
          onChange={handleOldPasswordChange}
          className="border border-gray-300 px-2 py-1"
        />
        {/* 새 비밀번호 */}
        <label htmlFor="newPassword">새로운 비밀번호</label>
        <input
          type="password"
          value={newPassword}
          onChange={handleNewPasswordChange}
          className="border border-gray-300 px-2 py-1"
        />
        {/* 새 비밀번호 확인 */}
        <p className={passwordStatusMessageClassName}>{passwordStatusMessage}</p>
        <label htmlFor="newPassword">새로운 비밀번호 확인</label>
        <input
          type="password"
          value={newPassword}
          onChange={handleNewPasswordChange}
          className="border border-gray-300 px-2 py-1"
        />
        {/* 비밀번호 메시지 */}
        <p className={passwordConfirmStatusMessageClassName}>{passwordConfirmStatusMessage}</p>
        {/* 비밀번호 변경 버튼 */}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
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
        <p className={setNicknameStatusMessageClassName}>{nicknameStatusMessage}</p>
        {/* 닉네임 변경 버튼 */}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          닉네임 변경
        </button>
      </form>
    </div>
  );
}

export default ModifyProfile;