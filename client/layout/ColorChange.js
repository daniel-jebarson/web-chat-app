import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { useColorModeValue, IconButton, useColorMode } from "@chakra-ui/react";
export default function ColorChange({ children }) {
  const colorIcon = useColorModeValue(<MoonIcon />, <SunIcon />);
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <IconButton
        position={"fixed"}
        top={"1.5"}
        left={"1.5"}
        size="sm"
        isRound
        onClick={toggleColorMode}
        _focus={{ boxShadow: "none" }}
        icon={colorIcon}
      />
      <main>{children}</main>
    </>
  );
}
