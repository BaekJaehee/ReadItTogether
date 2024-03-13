import React, { useState } from "react";
import { Link } from "react-router-dom";

import SideBar from "./SideBar";

import "../../App.css";
import logo from "../../assets/navbar/logo.png";
import burger from "../../assets/navbar/hamberger.png";
import search from "../../assets/navbar/search.png";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex justify-between items-center p-4 fixed w-full z-50">
      {/* 햄버거 버튼 */}
      <div className="flex">
        <button className="mr-4" onClick={toggleMenu}>
          <img className="w-5" src={burger} alt="햄버거" />
        </button>

        {/* 로고/홈 버튼 */}
        <Link to="/" className="font-extrabold mr-6">
          <img className="w-40" src={logo} alt="" />
        </Link>
        <Link to="/">
          <div className="font-extrabold text-xl">추천 홈</div>
        </Link>
      </div>

      {/* 검색 버튼 */}
      <div>
        <button>
          <img className="w-5" src={search} alt="검색" />
        </button>
      </div>

      {/* 사이드바 메뉴, isOpen 상태에 따라 표시 여부 결정 */}
      <div
        className={`fixed top-0 left-0 w-52 h-full bg-white p-4 box-border z-50 transform transition duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex">
          <button className="mr-4" onClick={toggleMenu}>
            <img className="w-5" src={burger} alt="햄버거" />
          </button>

          <Link to="/">
            <img className="w-36" src={logo} alt="" />
          </Link>
        </div>

        {/* 사이드바 메뉴 넣는 공간 */}
        <SideBar/>
      </div>
    </nav>
  );
};

export default NavBar;
