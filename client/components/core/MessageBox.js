import {
  Flex,
  InputGroup,
  InputRightElement,
  IconButton,
  Input,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiSend } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { Search2Icon } from "@chakra-ui/icons";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../hooks";
import Axios from "axios";
// import { socket } from "../../util/socket";
function MessageBox({ socket }) {
  const dispatch = useDispatch();
  const color = useColorModeValue("#fff", "#000");
  const bg = useColorModeValue("#000", "#fff");
  const bgBox = useColorModeValue("#383737", "#d8d8d8");
  const toast = useToast();
  const { SETCHAT, ADDMESSAGE } = bindActionCreators(actionCreators, dispatch);
  const [search, setSearch] = useState("");
  const chatData = useSelector((state) => state.chat);
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      // console.log("pressed nenter");
      handleMessage();
    }
  };
  const handleMessage = async () => {
    const userData = JSON.parse(localStorage.getItem("userInfo"));
    const config = {
      headers: {
        authorization: `Bearer ${userData.token}`,
      },
    };
    try {
      const { name, id } = chatData;
      setSearch("");
      const { data } = await Axios.post(
        `${process.env.NEXT_PUBLIC_BACKENDURL}/message`,
        {
          content: search,
          chatId: chatData.id,
        },
        config
      );
      dispatch({
        type: "ADD_MESSAGE",
        message: data,
        id: chatData.id,
      });
      // ADDMESSAGE(data, chatData.id);
      socket.emit("new message", data);
      // console.log(data);
      SETCHAT(name, id);
      // console.log(data);
    } catch (err) {
      console.log(err);
      toast({
        title: "Failed to send message!",
        description: err.response.data.msg,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }

    // socket.emit("check");
  };
  return (
    <Flex flexGrow={"1"} color={bg}>
      <InputGroup mx={"5"}>
        <Input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={handleEnter}
          value={search}
          placeholder="Enter the message here"
          _placeholder={{ color: color }}
          color={color}
          pl="5"
          bgColor={bgBox}
          border={"none"}
          boxShadow="dark-lg"
          rounded="md"
          maxHeight={"7vh"}
        />
        <InputRightElement>
          <IconButton
            flexGrow={1}
            colorScheme="green"
            aria-label="Get request"
            onClick={handleMessage}
            icon={<BiSend />}
          />
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
}

export default MessageBox;
