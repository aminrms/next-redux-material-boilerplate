import React, { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { templateStyle } from "../styles/templates.style";
import { CssProps } from "@/types/global";
import { CloseSquare } from "iconsax-react";
import {
  FadeTransition,
  GrowTransition,
  SlideTransition,
  ZoomTransition,
} from "./TransitionsComponents";

type ModalPropTypes = {
  title?: string;
  closeAction?: () => any;
  renderContent?: () => React.ReactNode;
  renderActions?: () => React.ReactNode;
  renderHeader?: () => React.ReactNode;
  open: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  fullScreen?: boolean;
  maxWidth: "xs" | "sm" | "md" | "lg" | "xl";
  onSubmit?: () => any;
  seeOnly?: boolean;
  submitText?: string;
  dialogContentStyles?: CssProps;
  backdrop?: "opaque" | "blur" | "transparent";
  transition?: "fade" | "grow" | "slide" | "zoom";
  disableEscapeKeyDown?: boolean;
};

const Modal = ({
  title,
  closeAction,
  renderContent,
  renderActions,
  renderHeader,
  setOpen,
  open,
  maxWidth,
  fullScreen,
  submitText, // submit button action text
  seeOnly = false,
  onSubmit,
  dialogContentStyles,
  backdrop = "blur", // the style of backdrop
  transition = "grow", // the type of animation to show dialog
  disableEscapeKeyDown = false,
}: ModalPropTypes) => {
  const transparencyDegree: Record<typeof backdrop, string> = {
    blur: "10px",
    opaque: "3px",
    transparent: "0px",
  };
  const transitionType: Record<typeof transition, any> = {
    slide: SlideTransition,
    grow: GrowTransition,
    zoom: ZoomTransition,
    fade: FadeTransition,
  };
  const onClose = () => {
    if (setOpen) setOpen(false);
    if (closeAction) closeAction();
  };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      fullScreen={fullScreen}
      maxWidth={maxWidth}
      TransitionComponent={transitionType[transition]}
      sx={{
        "& .MuiBackdrop-root": {
          backdropFilter: `blur(${transparencyDegree[backdrop]}) !important`,
        },
      }}
      disableEscapeKeyDown={disableEscapeKeyDown}
    >
      <DialogTitle>
        {renderHeader ? (
          renderHeader()
        ) : (
          <Box sx={templateStyle.dialogTitle}>
            <Typography variant="subtitle1" color="primary.dark">
              {title ?? ""}
            </Typography>{" "}
            <IconButton onClick={onClose}>
              <CloseSquare size={20} />
            </IconButton>
          </Box>
        )}
      </DialogTitle>
      <DialogContent
        style={{
          ...(templateStyle.dialogContent as CssProps),
          maxHeight: "30vh",
          overflowY: "auto",
          height: "50vh",
          ...dialogContentStyles,
        }}
      >
        {renderContent ? renderContent() : <Box></Box>}
      </DialogContent>
      <DialogActions>
        {renderActions
          ? renderActions()
          : !seeOnly && (
              <Box sx={templateStyle.dialogActions}>
                <Button
                  variant="outlined"
                  size="large"
                  color="error"
                  style={{ width: "auto" }}
                  onClick={onClose}
                >
                  خروج
                </Button>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => {
                    if (onSubmit) onSubmit();
                  }}
                  style={{ width: "auto" }}
                >
                  {submitText ?? "تایید"}
                </Button>
              </Box>
            )}
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
