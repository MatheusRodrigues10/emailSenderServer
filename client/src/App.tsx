import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Header";
import LoadingScreen from "./components/LoadingScreen";

// Pages
import DashBoard from "./pages/Dashboard";
import Landing from "./pages/Landing";
import SurveyNew from "./pages/SurveyNew";
import PaymentsPage from "./pages/PaymentsPage";
import { fetchUsers } from "./redux/features/authSlice";
import { AppDispatch, RootState } from "./redux/store";

import axios from "axios";
(window as any).axios = axios;

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.auth.loading);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <LoadingScreen />;

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/surveys" element={<DashBoard />} />
        <Route path="/surveys/new" element={<SurveyNew />} />
        <Route path="/payments" element={<PaymentsPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
