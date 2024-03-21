import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./authentication/AuthContext";
import PageLayout from "./components/navbar/PageLayout";

import Library from "./pages/library/Library";
import Login from "./pages/accounts/Login";
import FindPassword from "./pages/accounts/FindPassword";
import Bookshelf from "./pages/library/Bookshelf";
import NavBar from "./components/navbar/NavBar";
import Profile from "./pages/accounts/Profile";
import RecommendBook from "./pages/recomend/RecommendBook";
import DetailBook from "./pages/recomend/DetailBook";

import signUp from "./pages/accounts/signUp";
import Diary from "./components/modal/Diary/Diary";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <PageLayout>
          <Routes>
            <Route path="/" element={<Library />} />
            <Route path="/recommend-book" element={<RecommendBook />} />
            <Route path="/detail-book" element={<DetailBook />} />
            <Route path="/login" element={<Login />} />
            <Route path="/find-password" element={<FindPassword />} />
            <Route path="/bookshelf" element={<Bookshelf />} />
            <Route path="/signup" element={<signUp />} />
            <Route path="/diary" element={<Diary />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </PageLayout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
