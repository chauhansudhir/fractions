import React from "react";
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PlayPage from "./pages/PlayPage";
import "./styles/global.css";

function PlayPageWrapper() {
  const { modeId } = useParams();
  return <PlayPage modeId={modeId} />;
}

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/play/:modeId" element={<PlayPageWrapper />} />
      </Routes>
    </Router>
  );
}

export default App;
