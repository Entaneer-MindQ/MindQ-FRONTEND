import React from "react";
import { useAppController } from "./App_controller";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../src/styles/global.css";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { handleCMULogin } = useAppController();

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth_token="));
    if (token) {
      // Get the intended destination from state, or default to '/home'
      const from = location.state?.from?.pathname || "/home";
      navigate(from, { replace: true });
    }
  }, [navigate, location]);
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        {/* Logo Section */}
        <div className="flex justify-center mb-8">
          <div className="rounded-full bg-[var(--primary-color)] p-4 w-24 h-24 flex items-center justify-center">
            <img
              src="src\utils\login2.png"
              alt="CMU Logo"
              className="h-auto max-w-[100px]  object-contain"
            />
          </div>
        </div>

        {/* Welcome Text */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Welcome to CMU
          </h1>
          <p className="text-gray-600">Please select your login method</p>
        </div>

        {/* Login Buttons */}
        <div className="space-y-4">
          <button
            onClick={handleCMULogin}
            className="w-full bg-[var(--primary-color)] hover:bg-[var(--hover-color)] text-white transition-all duration-200 hover:text-[#575feb] font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
          >
            <span>Login as Student</span>
          </button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>© 2025 Chiang Mai University. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
