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
  useColorModeValue,
} from "@chakra-ui/react";
import { AiOutlineStop } from "react-icons/ai";
export default function ({ props }) {
  const color = useColorModeValue("#000", "#fff");
  const userbg = useColorModeValue("#cfc9c9", "#1c2c3c");
  const userhoverbg = useColorModeValue("#bbb9b9", "#2a3a49");
  const friendhoverbg = useColorModeValue("#8fa4b1", "#09090b");
  const friendbg = useColorModeValue("#a0b7c7", "#161512");
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
        bgColor={props.isUser ? userbg : friendbg}
        cursor="pointer"
        key={props.id}
        borderRadius={"lg"}
        _hover={{ bgColor: props.isUser ? userhoverbg : friendhoverbg }}
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
          <Flex ml={"5"}>
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
