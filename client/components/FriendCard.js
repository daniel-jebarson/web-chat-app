import React from "react";
import { Avatar, Flex, Text } from "@chakra-ui/react";

export default function (props) {
  return (
    <Flex
      px={"2"}
      py={"2"}
      height="fit-content"
      flexDirection={"row"}
      alignItems={"center"}
      gap={"2"}
      bgColor={props.select == props.id ? "#333539" : ""}
      cursor="pointer"
      _hover={{ bgColor: "#23272A" }}
    >
      <Avatar
        size="md"
        name={props.name}
        src={`https://avatars.dicebear.com/api/bottts/${props.name}.svg`}
      />
      <Text fontWeight={"bold"} fontSize={"2xl"} color="whiteAlpha.700">
        {props.name.slice(0, 25) === props.name
          ? props.name
          : props.name.slice(0, 24) + "..."}
      </Text>
    </Flex>
  );
}
