import React, { useState, useEffect } from "react";
import axios from "axios";
import { handleSignUp } from '../../api/signup/signUp';
// 닉네임, 이메일 중복처리 로직 확인 필요

const SignUp = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickname, setNickname] = useState('');
  const [name, setName] = useState('');
  const [birth, setBirth] = useState('');
  const [gender, setGender] = useState('');

  const [emailMessage, setEmailMessage] = useState('');
  const [emailStatusMessage, setEmailStatusMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState('');
  const [passwordConfirmMessageClassName, setPasswordConfirmMessageClassName] = useState(''); // 글자 색 바꾸기 위함
  const [nicknameMessage, setNicknameMessage] = useState('');
  const [nicknameStatusMessage, setNicknameStatusMessage] = useState('');

  // 중복체크용
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isNicknameValid, setIsNicknameValid] = useState(false);

  // 가입하기 버튼
  const [isFormValid, setIsFormValid] = useState(false);
  // 중복 확인 버튼
  const [isCorrectEmail, setIsCorrectEmail] = useState(false);
  const [isCorrectNickname, setIsCorrectNickname] = useState(false);

  useEffect(() => {
    // 모든 입력란이 채워졌는지 확인
    const emailRegExp = /^[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?$/;
    const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\\|[\]{};:'",.<>/?]).{8,20}$/;
    const nicknameRegExp = /^[가-힣a-zA-Z0-9]{2,8}$/;

    const isValid = email && emailRegExp.test(email) && password && passwordConfirm && (password === passwordConfirm) && passwordRegExp.test(password) && passwordRegExp.test(passwordConfirm) && nickname && nicknameRegExp.test(nickname) && birth && gender;
    setIsFormValid(isValid);
  }, [email, password, passwordConfirm, nickname, birth, gender]);

  useEffect(() => {
    const emailRegExp = /^[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?$/;
    const isCorrect = emailRegExp.test(email);
    setIsCorrectEmail(isCorrect);
  }, [email]);

  useEffect(() => {
    const nicknameRegExp = /^[가-힣a-zA-Z0-9]{2,8}$/;
    const isCorrect = nicknameRegExp.test(nickname);
    setIsCorrectNickname(isCorrect);
  }, [nickname]);

  const onChangeEmail = (e) => {
    const currentEmail = e.target.value;
    setEmail(currentEmail);
    const emailRegExp = /^[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-A-Za-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?$/;

    if (!emailRegExp.test(currentEmail) && currentEmail.length !== 0) {
      setEmailMessage('올바른 형식이 아닙니다!')
    } else {
      setEmailMessage('')
    }
  }

  const onChangePassword = (e) => {
    const currentPassword = e.target.value;
    setPassword(currentPassword);
    const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\\|[\]{};:'",.<>/?]).{8,20}$/;

    if (!passwordRegExp.test(currentPassword) && currentPassword.length !== 0) {
      setPasswordMessage('올바른 형식이 아닙니다!')
    } else {
      setPasswordMessage('')
    }
  }
  
  const onChangePasswordConfirm = (e) => {
    const currentPasswordConfirm = e.target.value;
    const passwordRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\\|[\]{};:'",.<>/?]).{8,20}$/;
    setPasswordConfirm(currentPasswordConfirm);
    if (password !== currentPasswordConfirm) {
      setPasswordConfirmMessage('비밀번호가 일치하지 않습니다!');
      setPasswordConfirmMessageClassName('text-red-500');
    } else if (!passwordRegExp.test(currentPasswordConfirm)) {
      setPasswordConfirmMessage('');
    } else {
      setPasswordConfirmMessage('비밀번호가 일치합니다.');
      setPasswordConfirmMessageClassName('text-blue-500');
    }
  }

  const onChangeNickname = (e) => {
    const currentNickname = e.target.value;
    setNickname(currentNickname);
    const nicknameRegExp = /^[가-힣a-zA-Z0-9]{2,8}$/;
    
    if (!nicknameRegExp.test(currentNickname) && currentNickname.length !== 0) {
      setNicknameMessage('올바른 형식이 아닙니다!')
    } else {
      setNicknameMessage('')
    }
  }

  let now = new Date();
  let years = []
  for (let y = now.getFullYear(); y >= 1930; y -= 1) {
    years.push(y)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await handleSignUp(name, email, password, nickname, birth, gender);
    } catch (error) {
      throw error;
    }

    // 회원가입 후 초기화
    setEmail('');
    setPassword('');
    setPasswordConfirm('');
    setNickname('');
    setName('');
    setBirth('');
    setGender('');
    setPasswordConfirmMessage('');
  }

  const checkEmailDuplicate = async (email) => {
    try {
      const response = await axios.get(API_BASE_URL + "/members/email_duplicate", {
        email: email
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return false; // 에러가 발생했을 경우 중복으로 처리
    }
  }

  const checkNicknameDuplicate = async (nickname) => {
    try {
      const response = await axios.get(API_BASE_URL + "/members/nickname_duplicate", {
        nickname: nickname
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return false; // 에러가 발생했을 경우 중복으로 처리
    }
  }

  const handleCheckEmail = async () => {
    try {
      const isEmailDuplicate = await checkEmailDuplicate(email);
      setIsEmailValid(!isEmailDuplicate);
      setEmailStatusMessage(isEmailDuplicate ? '중복된 이메일입니다.' : '사용 가능한 이메일입니다.');
    } catch (error) {
      console.error(error);
    }
  }

  const handleCheckNickname = async () => {
    try {
      const isNicknameDuplicate = await checkNicknameDuplicate(nickname);
      setIsNicknameValid(!isNicknameDuplicate);
      setNicknameStatusMessage(isNicknameDuplicate ? '중복된 닉네임입니다.' : '사용 가능한 닉네임입니다.');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="max-w-md mx-auto my-8 p-4 border border-gray-300 rounded shadow">
      <div className="flex justify-center">
        <h2 className="text-2xl mb-4">회원가입</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1">이름</label>
          <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} className="border border-gray-300 px-2 py-1 w-full" />
        </div>
        <div className="mb-4">
          <div className="flex justify-between">
            <label htmlFor="email" className="block mb-1">이메일</label>
            <p className="text-red-500 mr-32">{emailMessage}</p>
          </div>
          <div className="flex items-center">
            <input type="text" id="email" name="email" value={email} onChange={onChangeEmail} className="border border-gray-300 px-2 py-1 flex-grow mr-3" />
            <button type="button" onClick={handleCheckEmail} className={`bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded ml-2 ${!isCorrectEmail && 'opacity-50 cursor-not-allowed'}`} disabled={!isCorrectEmail}>중복 확인</button>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex justify-between">
            <label htmlFor="password" className="block mb-1">비밀번호</label>
            <p className="text-red-500">{passwordMessage}</p>
          </div>
          <input type="password" id="password" name="password" value={password} onChange={onChangePassword} className="border border-gray-300 px-2 py-1 w-full" />
          <p className="text-sm text-gray-500">영어 대문자, 소문자, 숫자, 특수문자가 1개 이상 있어야 합니다.</p>
        </div>
        <div className="mb-4">
          <div className="flex justify-between">
            <label htmlFor="passwordConfirm" className="block mb-1">비밀번호 확인</label>
            <p className={passwordConfirmMessageClassName}>{passwordConfirmMessage}</p>
          </div>
          <input type="password" id="passwordConfirm" name="passwordConfirm" value={passwordConfirm} onChange={onChangePasswordConfirm} className="border border-gray-300 px-2 py-1 w-full" />
        </div>
        <div className="mb-4">
          <div className="flex justify-between">
            <label htmlFor="nickname" className="block mb-1">닉네임</label>
            <p className="text-red-500 mr-32">{nicknameMessage}</p>
          </div>
          <div className="flex items-center">
            <input type="text" id="nickname" name="nickname" value={nickname} onChange={onChangeNickname} className="border border-gray-300 px-2 py-1 flex-grow mr-3" />
            <button type='button' onClick={handleCheckNickname} className={`bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded ml-2 ${!isCorrectNickname && 'opacity-50 cursor-not-allowed'}`} disabled={!isCorrectNickname}>중복 확인</button>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="birth" className="block mb-1">출생년도</label>
          <select id='birth' name='birth' value={birth} onChange={(e) => setBirth(e.target.value)} className="border border-gray-300 px-2 py-1 w-full">
            <option value="">---선택---</option>
            {years.map((year, index) => (
              <option key={index}>{year}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">성별</label>
          <div className="flex">
            <label className="mr-4"><input type="radio" name="gender" value="남자" onChange={(e) => setGender(e.target.value)} className="mr-1 ml-1" /> 남자</label>
            <label className="mr-4"><input type="radio" name="gender" value="여자" onChange={(e) => setGender(e.target.value)} className="mr-1 ml-1" /> 여자</label>
          </div>
        </div>
        <div className="flex justify-center">
          <button type="submit" className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${!isFormValid && 'opacity-50 cursor-not-allowed'}`} disabled={!isFormValid}>가입하기</button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;