import React from "react";
import { Link } from "react-router-dom";

import mainImg from "../../assets/login/mainImg.png";
import NaverLoginButton from "../../components/auth_login/NaverLoginButton";

const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <img
        className="absolute w-full h-full object-cover"
        src={mainImg}
        alt="메인 이미지"
      />
      
      {/* 로그인 창 */}
      <div className="relative p-8 bg-black bg-opacity-70 rounded shadow-md max-w-sm w-full">
        <h1 className="text-2xl text-white font-bold text-center mb-6">
          로 그 인
        </h1>

        <form className="space-y-6">
          <input
            type="text"
            placeholder="아이디"
            id="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500 bg-white text-gray-700"
            required
          />
          <input
            type="text"
            placeholder="비밀번호"
            id="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500 bg-white text-gray-700"
            required
          />
          <input type="checkbox" id="saveEmail" name="saveEmail" />
          <label htmlFor="saveEmail" className="text-white ml-2">
            아이디 저장
          </label>
          <button className="w-full focus:outline-none text-white bg-sky-600 hover:bg-sky-500 focus:ring-4 focus:ring-sky-300 font-medium rounded-lg py-2.5 ">
            로그인
          </button>
          <div className="text-white text-center">
            <Link to="/" className="text-sm hover:underline">
              아이디가 없으신가요?
            </Link>
            <br />
            <Link to="/" className="text-white text-sm hover:underline">
              비밀번호를 잊으셨나요?
            </Link>
          </div>
          <div className="flex items-center justify-center space-x-2 select-none">
            <hr className="w-28 bg-white h-0.5 border-none" />
            <span className="text-white">OR</span>
            <hr className="w-28 bg-white h-0.5 border-none" />
          </div>
          <div className="flex justify-center">
            <NaverLoginButton />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
