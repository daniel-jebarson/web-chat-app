import { Container, Flex, Image } from "@chakra-ui/react";
function OverlayChat() {
  return (
    <Flex
      flexGrow={"1"}
      m={"0"}
      opacity={"100"}
      saturate={"60"}
      bgImage={
        "https://cdn.discordapp.com/attachments/817021689782468648/1055098433070977035/Dani_Chat_App_-_Overlay.jpg"
      }
      bgSize={"cover"}
      bgRepeat={"no-repeat"}
      alignItems={"stretch"}
      // bgColor="red"
    ></Flex>
  );
}

export default OverlayChat;
