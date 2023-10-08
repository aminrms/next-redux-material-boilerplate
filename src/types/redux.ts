export interface SettingsInterface {
  setting: {
    loading: false;
    settings: string[] | {};
    isSeeWelcomeAlert: boolean;
    themeMode: "light" | "dark";
  };
  actionsAlert: {
    open: boolean;
    options: {
      type?: "success" | "warning" | "error";
      title?: string;
      description?: string;
      submitText?: string;
      canceledText?: string;
      renderSubmitButton?: () => React.ReactNode;
      renderCanceledButton?: () => React.ReactNode;
      confirmText?: string;
      onCloseAction?: () => void;
      onSubmitAction?: () => void;
    };
  };
}

export interface AuthInterface {
  login: {
    email: string;
    password: string;
  };
  register: {
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
    gender: string;
    accountType: string;
  };
}
