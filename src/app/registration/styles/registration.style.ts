import { centerEl } from "@/styles/globalCssProps";
import { CssProps, SxCssProperties } from "@/types/global";
const SxStyle: SxCssProperties = {
  container: {
    display: "flex",
    width: "100%",
    height: "100vh",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    gap: "0.5rem",
    width: "100%",
    height: "100%",
    padding: "2.5rem 0.5rem",
    justifyContent: "space-between",
  },
  logo: {
    width: "100%",
    height: "fit-content",
    flexDirection: "column",
    display: "flex",
    justifyContent: "flex-start",
    gap: 1,
  },
  submitButtonBox: {
    width: "100%",
    height: "fit-content",
    my: 1,
    ...centerEl,
  },
  changeModeRegist: {
    ...centerEl,
    width: "100%",
    height: "fit-content",
    gap: 1,
  },
  registrationImageBox: {
    height: "100%",
    ...centerEl,
    backgroundImage: (theme) =>
      `linear-gradient(20deg,${theme.palette.primary.dark} , ${theme.palette.primary.light})`,
    borderRadius: 4,
    transition: "all 0.35s ease-in-out",
  },
  registrationForm: {
    borderRadius: 4,
    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
    backgroundColor: (theme) => theme.palette.background.paper,
    ...centerEl,
    transition: "all 0.35s ease-in-out",
  },
  registrationFormField: {
    height: "100%",
    transition: "all 0.35s ease-in-out",
  },
  formFieldsBox: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
  signUpActionsBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
};

export default SxStyle;
