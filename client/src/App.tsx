import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Header from "./components/Header";

// Pages
import DashBoard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import SurveyNew from "./pages/SurveyNew";
import { fetchUsers } from "./redux/features/authSlice";
import { AppDispatch } from "./redux/store";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/surveys" element={<DashBoard />} />
        <Route path="/surveys/new" element={<SurveyNew />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
