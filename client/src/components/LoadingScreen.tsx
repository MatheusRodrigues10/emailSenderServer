import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const LoadingScreen = () => {
  const { loading, loadingMessage } = useSelector(
    (state: RootState) => state.auth
  );

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center space-y-4">
      <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      {loadingMessage && (
        <p className="text-blue-600 text-lg font-medium text-center max-w-xs px-4">
          {loadingMessage}
        </p>
      )}
    </div>
  );
};

export default LoadingScreen;
