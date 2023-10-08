import FormField from "@/components/templates/components/FormField";
import { useAppDispatch } from "@/hooks/useRedux";
import { handleChangeRegisterForm } from "@/redux/slicers/auth";
import { CssProps } from "@/types/global";
import { AuthInterface } from "@/types/redux";
import { formFieldsGenerator } from "@/utils/helper";
import { validations } from "@/utils/validations";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useState } from "react";
import * as Yup from "yup";
import SxStyle from "../styles/registration.style";
import { toast } from "react-hot-toast/headless";
type initialValuesType = AuthInterface["register"];
const validationSchema = Yup.object().shape({
  firstName: validations.firstName,
  lastName: validations.lastName,
  email: validations.email,
  password: validations.password,
  confirmPassword: validations.confirmPassword,
  phoneNumber: validations.phoneNumber,
  gender: validations.gender,
  accountType: Yup.string().required("نوع اکانت خود را وارد کنید"),
});
const SignUpComponent = () => {
  const dispatch = useAppDispatch();
  const [initialValues, setInitialValues] = useState<initialValuesType>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    confirmPassword: "",
    gender: "",
    accountType: "",
  });
  const signUpFormFields = formFieldsGenerator([
    { name: "firstName", label: "نام" },
    { name: "lastName", label: "نام خانوادگی" },
    { name: "phoneNumber", label: "شماره همراه" },
    { name: "email", label: "ایمیل" },
    {
      name: "gender",
      label: "جنسیت",
      fieldType: "select",
      selectOptions: [
        {
          label: "نا مشخص",
          value: "--",
        },
        {
          label: "خانم",
          value: "female",
        },
        {
          label: "آقا",
          value: "male",
        },
      ],
    },
    {
      name: "accountType",
      label: "نوع اکانت",
      fieldType: "select",
      selectOptions: [
        {
          label: "عادی",
          value: "",
        },
        {
          label: "VIP",
          value: "vip",
        },
      ],
    },
    { name: "password", label: "رمز عبور" },
    {
      name: "confirmPassword",
      label: "تکرار رمز عبور",
    },
  ]);
  function handleChangeForm({
    key,
    value,
  }: {
    key: string;
    value: string | number | undefined | null;
  }): void {
    dispatch(handleChangeRegisterForm({ key, value }));
  }
  return (
    <Container maxWidth="md" sx={{ width: "100%", height: "100%" }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={() => {
          // dispatch(registerUserAction())
        }}
        validateOnBlur
        enableReinitialize={true}
        validateOnChange
      >
        {({ isValid }) => (
          <Form style={SxStyle.form as CssProps}>
            <Box sx={SxStyle.logo}>
              <Typography variant="h6" color="primary.dark" fontWeight={600}>
                ثبت نام
              </Typography>
            </Box>
            <Grid container spacing={1} sx={SxStyle.formFieldsBox}>
              {signUpFormFields?.map((item, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <FormField item={item} onReduxChange={handleChangeForm} />
                </Grid>
              ))}
            </Grid>
            <Box sx={SxStyle.signUpActionsBox}>
              <Button
                variant="contained"
                type="submit"
                size="large"
                style={{ width: "50%" }}
                disabled={!isValid}
              >
                ثبت نام
              </Button>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Typography variant="subtitle2" color="GrayText">
                  حساب کاربری دارید؟
                </Typography>
                <Link href="/registration?mode=login">
                  <Typography
                    variant="subtitle2"
                    color="primary"
                    fontWeight={600}
                  >
                    ورود{" "}
                  </Typography>
                </Link>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default SignUpComponent;
