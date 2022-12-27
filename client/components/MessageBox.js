import {
  Flex,
  InputGroup,
  InputRightElement,
  IconButton,
  Input,
} from "@chakra-ui/react";
import { BiSend } from "react-icons/bi";
import { Search2Icon } from "@chakra-ui/icons";
import { socket } from "../util/socket";
function MessageBox() {
  const handleMessage = () => {
    console.log("event called");
    socket.emit("check");
  };
  return (
    <Flex flexGrow={"1"} color="white">
      <InputGroup mx={"5"}>
        <Input
          type="text"
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
