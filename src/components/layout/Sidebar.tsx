import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { Notification, Unlock } from "iconsax-react";
import { usePathname } from "next/navigation";
import React from "react";
import sideBarMenuItems from "../../constants/dummy.json";
import SidebarMenuItem from "./components/SidarMenuItem";
import layoutStyle from "./styles/layout.style";
import { centerEl, shape } from "@/styles/globalCssProps";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { setThemeMode } from "@/redux/slicers/setting";
const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const {
    setting: { themeMode },
  } = useAppSelector((state) => state.settingSlice);
  return (
    <Box sx={layoutStyle.sideBarContainer}>
      <Box sx={layoutStyle.sideBarHeaderWrapper}>
        <Box sx={layoutStyle.sideBarHeader}>
          <Box sx={layoutStyle.logo}>
            <Typography variant="h6" fontWeight={600} color="white.main">
              Kar
            </Typography>
            <Typography fontWeight={600} variant="h6" color="white">
              Jabe
            </Typography>
          </Box>
          <Box sx={layoutStyle.profileInfo}>
            <IconButton color="default">
              <Notification size={20} variant="Linear" />
            </IconButton>
            <Avatar
              src={"../../../public/assets/images/login.png"}
              variant="circular"
              sx={{ width: "35px", height: "35px" }}
            />
          </Box>
        </Box>
        <Box sx={layoutStyle.sideBarMenuWrapper}>
          {sideBarMenuItems.sidebar?.map((item, indx) => (
            <Box
              key={indx}
              sx={{ display: "flex", flexDirection: "column", gap: 1 }}
            >
              <Box
                sx={{
                  ...centerEl,
                }}
              >
                <Typography variant="subtitle1" color="white" fontWeight={600}>
                  {item?.name}
                </Typography>
              </Box>
              <Box sx={layoutStyle.sideBarMenu}>
                {item.menu.map((menuItem, index) => (
                  <SidebarMenuItem item={menuItem} key={index} />
                ))}
              </Box>
            </Box>
          ))}
        </Box>
        <Box sx={layoutStyle.sideBarUnlockFeatureBox}>
          <Unlock size={25} color="#fff" />
          <Typography variant="subtitle1" color="white">
            آنلاک سایر قابلیت ها
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              dispatch(setThemeMode(themeMode === "dark" ? "light" : "dark"));
            }}
          >
            ارتقا به حالت پریمیم
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
