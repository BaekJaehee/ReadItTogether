import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Library from "./pages/library/Library";
import Login from "./pages/accounts/Login";
import Bookshelf from "../src/pages/bookshelf/Bookshelf";
import NavBar from "./components/navbar/NavBar";

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Library />} />
          <Route path="/login" element={<Login />} />
          <Route path="/bookshelf" element={<Bookshelf />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
