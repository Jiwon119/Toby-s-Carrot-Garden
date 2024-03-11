// App.tsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import School from "./pages/School";
import Hospital from "./pages/Hospital";
import PoliceOffice from "./pages/PoliceOffice";
import Mypage from "./pages/Mypage";
import Mart from "./pages/Mart";
import Report from "./pages/Report";
import NotFound from "./pages/NotFound";
// import Logo from "./components/Logo";

function App() {
  const containerStyle: React.CSSProperties = {
    position: "relative",
    height: "100%",
    display: "block",
  };

  const backgroundStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -5,
    backgroundSize: "cover",
    backgroundImage: `url('src/assets/images/backgroundImage.png')`,
  };

  return (
    <div style={containerStyle}>
      <div style={backgroundStyle}></div>

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="school" element={<School />} />
        <Route path="hospital" element={<Hospital />} />
        <Route path="police" element={<PoliceOffice />} />
        <Route path="mypage" element={<Mypage />} />
        <Route path="mart" element={<Mart />} />
        <Route path="report" element={<Report />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
