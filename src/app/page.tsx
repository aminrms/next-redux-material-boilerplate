import HomeParent from "@/app/components/HomeParent";
import { generateMetadataProps } from "@/types/global";

export const generateMetadata: generateMetadataProps = () => {
  return {
    title: "صفحه ی اصلی",
  };
};
function Home() {
  return <HomeParent />;
}

export default Home;
