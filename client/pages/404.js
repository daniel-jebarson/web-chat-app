import Custom404 from "../components/error/index";
import { NextSeo } from "next-seo";

export default function Error() {
  return (
    <>
      <NextSeo
        title="WebChatApp - 404"
        description="Sorry this page doesn't exist!"
      />
      <Custom404 />
    </>
  );
}
