import React from "react"
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import SignUp from "./pages/accounts/SignUp";
import Diary from "./pages/library/Diary";

function App() {
  return (
    // <div>
    //   <div>영석아 배포할 시간이다~</div>
    // </div>
    <BrowserRouter>
      <Routes>
        <Route path="/sign_up" element={<SignUp/>}/>
      </Routes>
      <Routes>
        <Route path="/diary" element={<Diary/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
