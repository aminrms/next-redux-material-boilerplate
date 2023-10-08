"use client";
import { Box, Container } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import SxStyle from "../styles/registration.style";
import LoginComponent from "./LoginComponent";
import SignUpComponent from "./SignUpComponent";
const RegistrationParent: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const registrationMode = searchParams.get("mode");
  useEffect(() => {
    if (!registrationMode || !["login", "signup"].includes(registrationMode)) {
      router.push("/registration?mode=login");
    }
  }, [registrationMode]);
  // useEffect(() => {
  //   router.prefetch("/");
  // }, [router]);
  return (
    <>
      <Box sx={SxStyle.container}>
        <Container
          sx={{
            ...SxStyle.registrationForm,
            height: "600px",
          }}
          maxWidth="lg"
          style={{ padding: "0px" }}
        >
          <Box
            sx={{
              ...SxStyle.registrationImageBox,
              width: registrationMode === "login" ? "70%" : "30%",
            }}
          ></Box>
          <Box
            sx={{
              ...SxStyle.registrationFormField,
              width: registrationMode === "login" ? "30%" : "70%",
            }}
          >
            {registrationMode === "login" ? (
              <LoginComponent />
            ) : (
              <SignUpComponent />
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default RegistrationParent;
