import * as Yup from "yup";

const getCharacterValidationError = (str: string) => {
  return `رمز عبور باید حداقل یک ${str} داشته باشد!`;
};

export const validations = {
  firstName: Yup.string().required("نام را وارد کنید"),
  lastName: Yup.string().required("نام خانوادگی را وارد کنید"),
  phoneNumber: Yup.string()
    .required("لطفا شماره همراه خود را وارد کنید")
    .matches(/(\+?98|098|0|0098)?(9\d{9})/, "شماره همراه معتبر نیست"),
  confirmPassword: Yup.string()
    .required("لطفا رمز عبور را مجددا وارد کنید")
    .oneOf([Yup.ref("password")], "رمز عبور یکسان نیست!"),
  email: Yup.string().email("ایمیل نامعتبر است").required("ایمیل الزامی است"),
  password: Yup.string()
    .required("لطفا رمز عبور را وارد کنید")
    .min(8, "حداقل 8 کاراکتر را وارد کنید")
    .matches(/[0-9]/, getCharacterValidationError("عدد"))
    .matches(/[a-z]/, getCharacterValidationError("حرف کوچک"))
    .matches(/[A-Z]/, getCharacterValidationError("حرف بزرگ")),
  gender: Yup.string().required("جنسیت را انتخاب کنید"),
};
