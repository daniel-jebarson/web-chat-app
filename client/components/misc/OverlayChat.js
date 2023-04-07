import { Container, Flex, Image, useColorModeValue } from "@chakra-ui/react";
function OverlayChat() {
  const bgOverlayImage = useColorModeValue(
    "https://cdn.discordapp.com/attachments/921608169438994443/1093809257251614870/white-overlay.jpg",
    "https://cdn.discordapp.com/attachments/817021689782468648/1055098433070977035/Dani_Chat_App_-_Overlay.jpg"
  );
  return (
    <Flex
      flexGrow={"1"}
      m={"0"}
      opacity={"100"}
      saturate={"60"}
      bgImage={bgOverlayImage}
      bgSize={"cover"}
      bgRepeat={"no-repeat"}
      alignItems={"stretch"}
    ></Flex>
  );
}

export default OverlayChat;
