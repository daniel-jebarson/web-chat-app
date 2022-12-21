import { Container, Flex, Image } from "@chakra-ui/react";
function OverlayChat() {
  return (
    <Flex
      flexGrow={"1"}
      bgGradient={[
        "linear(to-tr, #272828.300, #444443.400)",
        "linear(to-t, #28282c.20#505454eal.500)",
        "linear(to-b, #201f1d.100, #312f31.300)",
      ]}
      m={"0"}
      opacity={"100"}
      saturate={"60"}
      // bgImage={
      //   "https://images.unsplash.com/photo-1517999144091-3d9dca6d1e43?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHx8&w=1000&q=80"
      // }
      bgSize={"cover"}
      bgRepeat={"no-repeat"}
      alignItems={"stretch"}
      // bgColor="red"
    >
      {/* <Image
        h={"100vh"}
        // w={"100"}
        sizes={"100%"}
        objectFit={"cover"}
        src={
          "https://preview.redd.it/o67iakxcon571.jpg?auto=webp&s=ff1eedad41db913d7701bd577b861b02ca5f613b"
        }
      ></Image> */}
    </Flex>
  );
}

export default OverlayChat;
