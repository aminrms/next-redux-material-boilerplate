import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { handleShowActionsAlert } from "@/redux/slicers/setting";
import { theme } from "@/styles/theme";
import { Danger, TickCircle, Warning2 } from "iconsax-react";
import { ReactNode } from "react";
import Modal from "../../templates/components/Modal";
import { useTheme } from "@mui/material";
// actions alert type that can get these three types
type actionsAlertType = "success" | "warning" | "error";
const AlertActions = () => {
  const dispatch = useAppDispatch();
  const { options, open } = useAppSelector(
    (state) => state.settingSlice.actionsAlert
  );
  const theme = useTheme();
  // alert design types
  const alertTypes: Record<
    actionsAlertType,
    {
      header: () => ReactNode;
      content: () => ReactNode;
      actions: () => ReactNode;
    }
  > = {
    warning: {
      header: () => {
        return <Warning2 size={50} color={theme.palette.warning.main} />;
      },
      content: () => {
        return <Warning2 size={50} color={theme.palette.warning.main} />;
      },
      actions: () => {
        return <Warning2 size={50} color={theme.palette.warning.main} />;
      },
    },
    success: {
      header: () => {
        return <TickCircle size={80} color={theme.palette.success.main} />;
      },
      content: () => {
        return <TickCircle size={80} color={theme.palette.success.main} />;
      },
      actions: () => {
        return <TickCircle size={80} color={theme.palette.success.main} />;
      },
    },
    error: {
      header: () => {
        return <Danger size={50} color={theme.palette.error.main} />;
      },
      content: () => {
        return <Danger size={50} color={theme.palette.error.main} />;
      },
      actions: () => {
        return <Danger size={50} color={theme.palette.error.main} />;
      },
    },
  };
  // render each part of alert modal type
  const renderType = alertTypes[options.type as actionsAlertType];
  return (
    <Modal
      open={open}
      transition="grow"
      closeAction={() => {
        dispatch(handleShowActionsAlert(false));
        if (options?.onCloseAction) options?.onCloseAction();
      }}
      maxWidth="sm"
      title={options.title}
      backdrop="transparent"
      renderHeader={renderType["header"]}
      renderActions={renderType["actions"]}
      renderContent={renderType["content"]}
    />
  );
};

export default AlertActions;
