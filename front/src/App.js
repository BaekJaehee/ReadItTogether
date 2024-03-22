import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import PageLayout from "./components/navbar/PageLayout";

import { AuthProvider } from "./authentication/AuthContext";
import PrivateRoute from "./authentication/routers/PrivateRouter";
import PublicRoute from "./authentication/routers/PublicRouter";

import Library from "./pages/library/Library";
import Login from "./pages/accounts/Login";
import FindPassword from "./pages/accounts/FindPassword";
import Bookshelf from "./pages/library/Bookshelf";
import Profile from "./pages/accounts/Profile";
import RecommendBook from "./pages/recomend/RecommendBook";
import DetailBook from "./pages/recomend/DetailBook";
import Logout from "./api/accounts/Logout";

import SignUp from "./pages/accounts/SignUp";
import Diary from "./components/modal/Diary/Diary";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <PageLayout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/find-password" element={<FindPassword />} />
            <Route path="/:memberId" element={<Library />} />
            <Route path="/profile/:memberId" element={<Profile />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/recommend-book" element={<RecommendBook />} />
            <Route path="/detail-book/:bookId" element={<DetailBook />} />
            <Route path="/bookshelf" element={<Bookshelf />} />
            <Route path="/diary/:memberId" element={<Diary />} />

            {/* 유저 인증 상태 관리 */}
            {/* 미완성 .. */}
            {/* <Route element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/find-password" element={<FindPassword />} />
            </Route>

            <Route element={<PrivateRoute />}>
              <Route path="/:memberId" element={<Library />} />
              <Route path="/profile/:memberId" element={<Profile />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/recommend-book" element={<RecommendBook />} />
              <Route path="/detail-book/:bookId" element={<DetailBook />} />
              <Route path="/bookshelf" element={<Bookshelf />} />
              <Route path="/diary/:memberId" element={<Diary />} />
            </Route> */}
          </Routes>
        </PageLayout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
