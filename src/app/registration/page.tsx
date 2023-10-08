import RegistrationParent from "@/app/registration/components/RegistrationParent";
import { generateMetadataProps } from "@/types/global";

export const generateMetadata: generateMetadataProps = ({ searchParams }) => {
  return {
    title: searchParams.mode === "login" ? "ورود" : "ثبت نام",
  };
};
const RegistrationPage = () => {
  return (
    <>
      <RegistrationParent />
    </>
  );
};

export default RegistrationPage;
