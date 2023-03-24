import React from "react";
import {
  Avatar,
  Flex,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

export default function (props) {
  const { colorMode, toggleColorMode } = useColorMode();
  const selected = useColorModeValue("#dee4e7", "#373838");
  const bg = useColorModeValue("#f9fafa", "#272727");
  const hover = useColorModeValue("#dee4e7", "#424242");
  const color = useColorModeValue("#000", "#fff");
  return (
    <Flex
      px={"2"}
      py={"2"}
      height="fit-content"
      flexDirection={"row"}
      alignItems={"center"}
      gap={"2"}
      bgColor={props.select == props.id ? selected : bg}
      cursor="pointer"
      _hover={{ bgColor: hover }}
    >
      <Avatar
        size="md"
        name={props.name}
        src={`https://avatars.dicebear.com/api/bottts/${props.name}.svg`}
      />
      <Text fontWeight={"bold"} fontSize={"2xl"} color={color}>
        {props.name.slice(0, 25) === props.name
          ? props.name
          : props.name.slice(0, 24) + "..."}
      </Text>
    </Flex>
  );
}
