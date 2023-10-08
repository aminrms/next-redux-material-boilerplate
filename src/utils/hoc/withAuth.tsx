"use client";
import { useAppDispatch } from "@/hooks/useRedux";
import React, { Component } from "react";
import { getFromLocalStorage } from "../helper";
import { useRouter } from "next/navigation";

const withAuth = (component: React.FC) => {
  const Auth = (props) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    if (!getFromLocalStorage("AUTH_TOKEN")) {
      router.replace("/registration?mode=login");
      return <></>;
    } else {
      return <Component {...props} />;
    }
  };
  return Auth;
};

export default withAuth;
