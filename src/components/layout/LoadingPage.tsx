"use client";
import React from "react";
import { globalStyles } from "@/styles/globalCssProps";
import { Box, useTheme } from "@mui/material";
import { HashLoader } from "react-spinners";

const LoadingPage = () => {
  const theme = useTheme();
  return (
    <Box sx={globalStyles.pageContainer}>
      <HashLoader size={50} color={theme.palette.primary.main} />
    </Box>
  );
};

export default LoadingPage;
