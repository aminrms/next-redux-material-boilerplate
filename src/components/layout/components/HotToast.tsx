import React from "react";
import { toast, ToastBar, Toaster } from "react-hot-toast";
const HotToast = () => {
  return (
    <div>
      <Toaster
        reverseOrder={false}
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: "8px",
          },
          duration: 3000,
        }}
      />
    </div>
  );
};

export default HotToast;
