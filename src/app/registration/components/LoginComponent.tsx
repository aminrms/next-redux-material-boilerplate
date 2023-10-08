import FormField from "@/components/templates/components/FormField";
import { useAppDispatch } from "@/hooks/useRedux";
import { handleChangeLoginForm } from "@/redux/slicers/auth";
import { CssProps } from "@/types/global";
import { AuthInterface } from "@/types/redux";
import { formFieldsGenerator, setToLocalStorage } from "@/utils/helper";
import { validations } from "@/utils/validations";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import SxStyle from "../styles/registration.style";
import toast from "react-hot-toast";
import { useCookies } from "react-cookie";
import { getTomorrowDate } from "@/utils/dateHelpers";
import { setSeeWelcomeAlert } from "@/redux/slicers/setting";
type initialValueType = AuthInterface["login"];
const validationSchema = Yup.object().shape({
  email: validations.email,
  password: validations.password,
});
const LoginComponent: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [initialValues, setInitialValues] = useState<initialValueType>({
    email: "",
    password: "",
  });
  const loginFormFields = formFieldsGenerator([
    { name: "email", label: "ایمیل" },
    { name: "password", label: "رمز عبور" },
  ]);
  function handleChangeForm({
    key,
    value,
  }: {
    key: string;
    value: string | number | undefined | null;
  }): void {
    dispatch(handleChangeLoginForm({ key, value }));
  }
  const [{ login_time }, setCookie] = useCookies(["login_time", "auth_token"]);

  return (
    <Container maxWidth="md" sx={{ height: "100%" }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnBlur
        validateOnChange
        onSubmit={(values) => {
          toast.success("با موفقیت وارد شدید", {
            position: "top-right",
          });
          if (!login_time) {
            setCookie("login_time", values, {
              expires: getTomorrowDate().standardTime,
            });
            dispatch(setSeeWelcomeAlert(true));
          }
          setCookie(
            "auth_token",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
            {
              expires: getTomorrowDate().standardTime,
            }
          );
          router.replace("/");
        }}
        enableReinitialize={true}
      >
        {({ isValid }) => (
          <Form style={SxStyle.form as CssProps}>
            <Box sx={SxStyle.logo}>
              <Image
                src={"/assets/images/login.png"}
                width={60}
                height={60}
                placeholder="blur"
                alt="jabekar-logo"
                blurDataURL="/assets/images/login.png"
                style={{ objectFit: "cover", borderRadius: "50%" }}
              />
              <Typography variant="h6" color="primary.dark" fontWeight={600}>
                ورود
              </Typography>
            </Box>
            <Grid container spacing={1}>
              {loginFormFields?.map((item, index) => (
                <Grid item xs={12} key={index}>
                  <FormField item={item} onReduxChange={handleChangeForm} />
                </Grid>
              ))}
            </Grid>
            <Box sx={SxStyle.submitButtonBox}>
              <Button
                variant="contained"
                type="submit"
                style={{ width: "100%" }}
                size="large"
                disabled={!isValid}
              >
                ورود
              </Button>
            </Box>
            <Box sx={SxStyle.changeModeRegist}>
              <Typography variant="subtitle2" color="GrayText">
                حساب کاربری ندارید؟
              </Typography>
              <Link href="/registration?mode=signup">
                <Typography
                  variant="subtitle2"
                  color="primary"
                  fontWeight={600}
                >
                  ثبت نام
                </Typography>
              </Link>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default LoginComponent;
