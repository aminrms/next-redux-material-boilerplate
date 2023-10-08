import store from "@/redux/setup/store";
import { getFromLocalStorage } from "@/utils/helper";
import { green, red, yellow } from "@mui/material/colors";
import { Theme, createTheme, responsiveFontSizes } from "@mui/material/styles";

const paletteTheme = {
  dark: {
    primary: {
      main: green[800],
      dark: green[900],
      light: green[700],
    },
  },
  light: {
    primary: {
      main: yellow[800],
      dark: yellow[900],
      light: yellow[700],
    },
  },
};
const themeGenerator = () => {
  const themeMode = store.getState().settingSlice.setting.themeMode;
  let theme = responsiveFontSizes(
    createTheme({
      direction: "rtl",
      typography: {
        fontFamily: "Vazir",
      },
      palette: {
        mode: themeMode,
        ...paletteTheme[themeMode],
      },
      shape: {
        borderRadius: 15,
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              boxShadow: "none",
              borderRadius: 20,
              transition: "all 0.2s",
              ":active": {
                transform: "scale(0.99)",
                boxShadow: "none",
              },
              ":hover": {
                boxShadow: "none",
              },
              width: "100%",
            },
          },
        },
        MuiInputBase: {
          styleOverrides: {
            root: {
              "& .MuiInputBase-input": {
                height: "0.85rem",
              },
              "& .MuiSelect-select": {
                minHeight: "0.85rem !important",
                paddingBottom: "0.7rem",
              },
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px !important",
              borderRadius: 20,
              padding: "auto 0.5rem",
            },
          },
        },
      },
    })
  );
  return { theme };
};

export default themeGenerator;
