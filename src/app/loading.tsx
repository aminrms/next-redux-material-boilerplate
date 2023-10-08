import React from "react";
import LoadingPage from "@/components/layout/LoadingPage";
import { centerEl } from "@/styles/globalCssProps";
const PageLoading: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100vh",...centerEl }}>
      <LoadingPage />
    </div>
  );
};

export default PageLoading;
