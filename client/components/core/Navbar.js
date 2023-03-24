import { AiOutlineSync } from "react-icons/ai";
import { FiHelpCircle } from "react-icons/fi";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { actionCreators } from "../../hooks";
import { Search2Icon, AtSignIcon } from "@chakra-ui/icons";
import { MdPersonRemoveAlt1 } from "react-icons/md";
import { ImStatsDots } from "react-icons/im";
import {
  Flex,
  IconButton,
  Text,
  Container,
  InputGroup,
  Input,
  InputRightElement,
  usePrefersReducedMotion,
  keyframes,
  Box,
  useToast,
  useDisclosure,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react";
import Axios from "axios";
import StatisticsView from "../views/StatisticsView";
import { AiFillGithub } from "react-icons/ai";
import { useState } from "react";

function Navbar(props) {
  const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(5400deg); }`;
  const color = useColorModeValue("#000", "#fff");
  const prefersReducedMotion = usePrefersReducedMotion();
  const toast = useToast();
  const animation = prefersReducedMotion
    ? undefined
    : `${spin} infinite 20s linear`;
  const dispatch = useDispatch();
  // const chatData = useSelector((state) => state.chat);
  const { REMOVEFRIEND, REMOVEUSERMESSAGE, SETCHAT } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const removeFriend = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      // console.log(props);
      const config = {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
        data: { chatId: props.id },
      };
      console.log(props.friend);
      props.socket.emit("delete chat", {
        chatId: props.id,
        friend: props.friend,
      });
      const { data } = await Axios.delete(
        `${process.env.NEXT_PUBLIC_BACKENDURL}/chat`,

        config
      );
      console.log(data);
      // console.log("data", data);
      toast({
        title: "Chat deleted successfully!",
        description: `Removed chat of ${props.name}`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });

      REMOVEFRIEND(props.name);
      REMOVEUSERMESSAGE(props.id);
      SETCHAT("", -1);
      console.log(props.name + props.id + " removed success");
    } catch (err) {
      // console.log(err);
      toast({
        title: "Error occured!",
        description: `Failed to delete chat of ${props.name}`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      console.log(err);
    }
  };

  return (
    <Flex
      height={"8vh"}
      flexDirection="row"
      alignItems={"center"}
      gap={"4"}
      px={"10"}
      pt="5"
    >
      <AtSignIcon boxSize={"5"} color={color} />
      <Text
        color={color}
        fontSize="20"
        fontWeight={"semibold"}
        fontStyle="oblique"
        ml="-1.5"
      >
        {props.name}
      </Text>
      <Container color={"white"} />

      <StatisticsView chatId={props.id} />
      <IconButton
        variant="link"
        color={color}
        size={"lg"}
        onClick={removeFriend}
        icon={<MdPersonRemoveAlt1 />}
      />
      <IconButton
        variant="link"
        color={color}
        size={"lg"}
        icon={<AiFillGithub />}
        onClick={() => {
          window.location.href =
            "https://github.com/daniel-jebarson/web-chat-app";
        }}
      />
      <IconButton
        variant="link"
        color={color}
        size={"lg"}
        icon={<AiOutlineSync />}
        _focus={{ animation: animation }}
        onClick={() => {
          window.location.href = window.location.href;
        }}
        // animation={animation}
      />
    </Flex>
  );
}

export default Navbar;
