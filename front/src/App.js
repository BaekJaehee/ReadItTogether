import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Library from "./pages/library/Library";
import Login from "./pages/accounts/Login";
import FindPassword from "./pages/accounts/FindPassword";
import Bookshelf from "./pages/library/Bookshelf";
import NavBar from "./components/navbar/NavBar";
import Profile from "./pages/accounts/Profile";

import SignUp from "./pages/accounts/SignUp";
import Diary from "./components/modal/Diary/Diary";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Library />} />
          <Route path="/login" element={<Login />} />
          <Route path="/find_password" element={<FindPassword />} />
          <Route path="/bookshelf" element={<Bookshelf />} />
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/diary" element={<Diary/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
