import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-32">
      <div className="w-20 h-20 border-4 border-red-500 border-dashed rounded-full animate-spin"></div>
    </div>
  );
}
