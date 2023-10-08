import { useAppDispatch } from "@/hooks/useRedux";
import {
  handleShowActionsAlert,
  setActionsAlertOptions,
} from "@/redux/slicers/setting";
import { SettingsInterface } from "@/types/redux";

type fireActionType =
  ({}: SettingsInterface["actionsAlert"]["options"]) => void;

const useActionAlert = () => {
  const dispatch = useAppDispatch();
  const fire: fireActionType = (options) => {
    dispatch(handleShowActionsAlert(true));
    dispatch(
      setActionsAlertOptions({ type: options?.type ?? "success", ...options })
    );
  };

  return { fire };
};

export default useActionAlert;
