"use client";
import PageLoading from "@/app/loading";
import useMuiConfig from "@/hooks/useMuiConfig";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { globalStyles } from "@/styles/globalCssProps";
import themeGenerator from "@/styles/theme";
import { CssProps } from "@/types/global";
import { handleShowItemBasedOnRoute } from "@/utils/helper";
import { CacheProvider } from "@emotion/react";
import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname, useRouter, useServerInsertedHTML } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import Sidebar from "./Sidebar";
import AlertActions from "./components/AlertActions";
import HotToast from "./components/HotToast";
const ParentLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const router = useRouter();
  const {
    setting: { themeMode },
  } = useAppSelector((state) => state.settingSlice);
  const [theme, setTheme] = useState(themeGenerator()?.theme);
  const dispatch = useAppDispatch();
  const [{ auth_token }] = useCookies(["auth_token"]);
  const { cache, flush } = useMuiConfig();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let styles = "";
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });
  const showSideBar = handleShowItemBasedOnRoute(
    pathname,
    ["/registration"],
    false
  );
  useEffect(() => {
    setTheme(themeGenerator()?.theme);
  }, [themeMode, prefersDarkMode]);
  return (
    <>
      <HotToast />
      <CookiesProvider>
        <AnimatePresence
          mode="wait"
          initial={false}
          onExitComplete={() => window.scrollTo(0, 0)}
        >
          <CacheProvider value={cache}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <AlertActions />
              <main style={globalStyles?.pageContainer as CssProps}>
                {showSideBar && <Sidebar />}
                <motion.section
                  key={pathname}
                  style={{
                    ...(globalStyles.container as CssProps),
                    width: showSideBar ? "80%" : "100%",
                  }}
                  initial={{ y: 300, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 300, opacity: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  }}
                >
                  <Suspense fallback={<PageLoading />}>{children}</Suspense>
                </motion.section>
              </main>
            </ThemeProvider>
          </CacheProvider>
        </AnimatePresence>
      </CookiesProvider>
    </>
  );
};

export default ParentLayout;
