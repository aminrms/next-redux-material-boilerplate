import { Box, Collapse, Typography } from "@mui/material";
import { ArrowLeft2, Bag } from "iconsax-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import layoutStyle from "../styles/layout.style";
import { useState, useEffect } from "react";
type props = {
  item: {
    name: string;
    path: string;
    sub_menu?: { name: string; path: string }[];
  };
};
const SidebarMenuItem = ({ item: { name, path, sub_menu } }: props) => {
  const pathname = usePathname();
  const [openSubMenu, setOpenSubMenu] = useState<boolean>(false);
  const [hasSubMenu] = useState<boolean>(sub_menu && sub_menu?.length);
  useEffect(() => {
    if (hasSubMenu) {
      setOpenSubMenu(true);
    }
  }, []);
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      flexDirection={"column"}
      style={{ width: "100%", height: "100%" }}
    >
      <Link
        href={hasSubMenu ? "#" : path}
        style={{ width: "100%" }}
        rel="prefetch"
        onClick={() => {
          if (hasSubMenu) {
            setOpenSubMenu((prev) => !prev);
          }
        }}
      >
        <Box
          sx={{
            ...layoutStyle.sideBarItem,
            background: path === pathname ? "white" : "transparent",
            color: path === pathname ? "#333" : "white",
            ":hover": {
              backgroundColor: path === pathname ? "default" : "#00000040",
            },
          }}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <Bag size={20} color={path === pathname ? "#333" : "#fff"} />
            <Typography
              variant="subtitle2"
              color={path === pathname ? "#333" : "white"}
              fontWeight={600}
            >
              {name}
            </Typography>
          </Box>
          {hasSubMenu && (
            <ArrowLeft2
              color="#fff"
              size={15}
              style={{
                transform: openSubMenu ? "rotate(-90deg)" : "rotate(0deg)",
                transition: "transform 0.15s ",
              }}
            />
          )}
        </Box>
      </Link>
      <Collapse in={openSubMenu} sx={layoutStyle.collapseWrapper}>
        <Box sx={layoutStyle.sideBarSubMenuWrapper}>
          <SubMenu sub_menu={sub_menu} pathname={pathname} />
        </Box>
      </Collapse>
    </Box>
  );
};

const SubMenu = ({
  sub_menu,
  pathname,
}: {
  sub_menu: props["item"]["sub_menu"];
  pathname: string;
}) => {
  return sub_menu?.map(({ name, path }, index) => (
    <Link href={path} style={{ width: "100%", height: "100%" }} rel="prefetch">
      <Box
        sx={{
          ...layoutStyle.sideBarItem,
          background: path === pathname ? "white" : "transparent",
          color: path === pathname ? "#333" : "white",
          ":hover": {
            backgroundColor: path === pathname ? "default" : "#00000040",
          },
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <Bag size={18} color={path === pathname ? "#333" : "#fff"} />
          <Typography
            variant="subtitle2"
            color={path === pathname ? "#333" : "white"}
            fontWeight={600}
          >
            {name}
          </Typography>
        </Box>
      </Box>
    </Link>
  ));
};

export default SidebarMenuItem;
