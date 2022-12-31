import {
  Flex,
  InputGroup,
  InputRightElement,
  IconButton,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { BiSend } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { Search2Icon } from "@chakra-ui/icons";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../hooks";
import Axios from "axios";
// import { socket } from "../../util/socket";
function MessageBox() {
  const dispatch = useDispatch();
  const toast = useToast();
  const { SETCHAT } = bindActionCreators(actionCreators, dispatch);
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
      const { data } = await Axios.post(
        `http://localhost:5000/message`,
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
      console.log(data);
      SETCHAT(name, id);
      // console.log(data);
      setSearch("");
    } catch (err) {
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
    <Flex flexGrow={"1"} color="white">
      <InputGroup mx={"5"}>
        <Input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={handleEnter}
          value={search}
          placeholder="Enter the message here"
          color="white"
          pl="5"
          bgColor={"#353636"}
          border={"none"}
          boxShadow="dark-lg"
          rounded="md"
          height={"6vh"}
        />
        <InputRightElement>
          <IconButton
            mr={"0.5"}
            mt="0.5"
            size="md"
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
