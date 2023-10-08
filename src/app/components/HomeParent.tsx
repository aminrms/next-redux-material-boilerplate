"use client";
import useActionAlert from "@/hooks/useActionAlert";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setSeeWelcomeAlert } from "@/redux/slicers/setting";
import { centerEl } from "@/styles/globalCssProps";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";

const HomeParent = () => {
  const router = useRouter();
  const { fire } = useActionAlert();
  const dispatch = useAppDispatch();
  const {
    setting: { isSeeWelcomeAlert },
  } = useAppSelector((state) => state.settingSlice);
  const [{ login_time }] = useCookies(["login_time"]);
  // handle show welcome dialog at first log in
  useEffect(() => {
    if (login_time) {
      if (isSeeWelcomeAlert) {
        fire({
          title: "خوش آمدید!",
          onCloseAction: () => {
            dispatch(setSeeWelcomeAlert(false));
          },
          type: "success",
        });
      }
    }
  }, [isSeeWelcomeAlert, login_time]);
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      {[...Array(11)].map((item) => (
        <Box
          sx={{
            width: "100%",
            height: "500px",
            ...centerEl,
          }}
        >
          sd
        </Box>
      ))}
    </Box>
  );
};

export default HomeParent;
