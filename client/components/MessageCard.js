import React from "react";
import { Avatar, Flex, Text, Box, IconButton } from "@chakra-ui/react";
import { TbEdit } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { BiSave } from "react-icons/bi";
export default function (props) {
  return (
    <Flex flexDirection={props.isUser ? "row" : "row-reverse"} px={"4"}>
      <Box width={"36%"}></Box>
      <Flex
        px={"2"}
        py={"2"}
        mt={"4"}
        ml={"2"}
        height="fit-content"
        flexDirection={props.isUser ? "row-reverse" : "row"}
        bgColor={props.isUser ? "#1c2c3c" : "#23272A"}
        cursor="pointer"
        key={props.id}
        _hover={{ bgColor: props.isUser ? "#2a3a49" : "#2a2c2d" }}
        // mr={"30%"}
      >
        <Avatar
          mt={"3"}
          size="md"
          name={props.name}
          src={`https://avatars.dicebear.com/api/bottts/${props.name}.svg`}
        />
        <Flex flexGrow="1" flexDirection={"column"} justifyContent={"center"}>
          <Flex
            flexDirection={props.isUser ? "row-reverse" : "row"}
            h="7"
            pt={"2"}
            px={"4"}
            gap={"2.5"}
          >
            <Text
              fontWeight={"bold"}
              fontSize={"xl"}
              position={"relative"}
              top={"-2"}
              color="whiteAlpha.700"
            >
              {props.name.slice(0, 25) === props.name
                ? props.name
                : props.name.slice(0, 24) + "..."}
            </Text>
            <Text
              fontSize={"12"}
              position={"relative"}
              top={"0"}
              color={"white"}
            >
              {props.time}
            </Text>
          </Flex>
          <Flex>
            <Text
              textAlign={props.isUser ? "right" : "left"}
              wordBreak={"break-word"}
              px={"4"}
              py={"2.5"}
              color={"white"}
            >
              {props.message}
            </Text>
          </Flex>
          <Flex
            minHeight="2"
            px={"3.5"}
            flexDirection={props.isUser ? "row" : "row-reverse"}
          >
            <Text color={"white"} fontSize="11" position={"relative"} right="1">
              {props.time}
            </Text>
            {props.isUser ? (
              <Box>
                <IconButton
                  variant="link"
                  color={"white"}
                  size={"lg"}
                  icon={<TbEdit />}
                />
                <IconButton
                  variant="link"
                  color={"white"}
                  size={"lg"}
                  icon={<MdDelete />}
                />
              </Box>
            ) : (
              ""
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
