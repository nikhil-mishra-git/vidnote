import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

import { getProfile } from "./api/apiCalls.js";
import { setAuth, clearAuth } from "./store/authSlice";

import LandingPage from "./pages/LandingPage";
import DashboardLayout from "./components/Dashboard/DashboardLayout";
import MyNotes from "./components/Dashboard/MyNotes";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import NewVideo from "./components/Dashboard/NewNote";
import Profile from "./components/Dashboard/Profile";
import DetailNote from "./components/Dashboard/DetailNote";
import ProtectedRoute from "./components/utils/ProtectedRoutes";
import LoadingScreen from "./components/utils/LoadingScreen";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        dispatch(setAuth(data.user));
      } catch (error) {
        dispatch(clearAuth());
      }
    };

    fetchProfile();
  }, [dispatch]);

  if (loading) return null;

  return (
    <>
      {showLoader && <LoadingScreen onComplete={() => setShowLoader(false)} />}

      {!showLoader && (
        <>
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              style: {
                background: "#121212",
                color: "#fff",
              },
            }}
          />

          <Routes>
            {/* Public */}
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <LandingPage />
                )
              }
            />

            <Route
              path="/login"
              element={
                isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />
              }
            />

            <Route
              path="/register"
              element={
                isAuthenticated ? <Navigate to="/dashboard" /> : <RegisterPage />
              }
            />

            {/* Protected */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<Navigate to="my-notes" />} />

                <Route path="my-notes">
                  <Route index element={<MyNotes />} />
                  <Route path="detail-note/:id" element={<DetailNote />} />
                </Route>

                <Route path="new-note" element={<NewVideo />} />
                <Route path="profile" element={<Profile />} />
              </Route>

            </Route>

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
