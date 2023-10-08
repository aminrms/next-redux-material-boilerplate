import { SxCssProperties } from "@/types/global";
import React from "react";
export const centerEl: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const globalStyles: SxCssProperties = {
  container: {
    display: "flex",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
    position: "fixed",
    left: 0,
    top: 0,
    overflowY: "auto",
  },
  pageContainer: {
    width: "100%",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};

export const shape = {
  borderRadius: 1.3,
};
