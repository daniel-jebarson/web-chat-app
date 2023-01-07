import React from "react";
import {
  Avatar,
  Flex,
  Text,
  Box,
  IconButton,
  Input,
  useToast,
  Icon,
} from "@chakra-ui/react";
import { AiOutlineStop } from "react-icons/ai";
export default function ({ props }) {
  return (
    <Flex
      key={props.id}
      justifyContent={"space-between"}
      flexDirection={props.isUser ? "row" : "row-reverse"}
      px={"4"}
    >
      <Box width={"36%"}></Box>
      <Flex
        minW={"40%"}
        // w={"100%"}
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
              // updated
              fontSize={"xl"}
              position={"relative"}
              top={"-2"}
              color="red.500"
            >
              {props.name.slice(0, 25) === props.name
                ? props.name
                : props.name.slice(0, 24) + "..."}
            </Text>
            <Text
              fontSize={"12"}
              position={"relative"}
              top={"0"}
              color={"red.500"}
            >
              {new Date(props.time).toLocaleString()}
              {/* {props.time} */}
            </Text>
          </Flex>
          <Flex ml={"5"} pt={"4"}>
            <Icon mr={"3"} as={AiOutlineStop} w={5} h={5} color={"red.500"} />
            <Text color={"red.500"}>This message was deleted</Text>
          </Flex>
          <Text mb={"2"} pt={"2"} fontSize={"11"} color={"red.500"}>
            {/* 07/01/2023, 19:15:22 */}
            {new Date(props.updated).toLocaleString()}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
