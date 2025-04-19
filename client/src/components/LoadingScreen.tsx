import React from "react";

const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingScreen;
