import React from "react";
import { bindActionCreators } from "redux";
import {
  Container,
  Avatar,
  Flex,
  Text,
  useToast,
  useColorMode,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../hooks";
import Axios from "axios";
function UserCard({ gmail, username, data: user_Data, socket }) {
  const toast = useToast();
  const dispatch = useDispatch();
  const { colorMode, toggleColorMode } = useColorMode();
  const { ADDFRIEND } = bindActionCreators(actionCreators, dispatch);

  const getFriendId = async (data, user) => {
    for (let i = 0; i < data.users.length; i++) {
      if (data.users[i]["_id"] !== user._id) return data.users[i]["_id"];
    }
    return "";
  };

  const addFriend = async () => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    try {
      const config = {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await Axios.post(
        `${process.env.NEXT_PUBLIC_BACKENDURL}/chat`,
        { userId: user_Data._id },
        config
      );
      async function sleep(milliseconds) {
        return await new Promise((resolve) =>
          setTimeout(resolve, milliseconds)
        );
      }
      let friendId = await getFriendId(data, user);
      let tempData = {
        id: user["_id"],
        chatId: data["_id"],
        gmail: user["gmail"],
        username: user["username"],
        image: user["image"],
        passId: friendId,
      };
      socket.emit("add chat", tempData);

      toast({
        title: "User added!",
        description: `Created chat for ${username}`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      await sleep(500);
      ADDFRIEND(user_Data);
      window.location.href = "/chat";
    } catch (err) {
      toast({
        title: "Error occured!",
        description: `Failed to create chat for ${username}`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      console.log(err);
    }
  };
  return (
    <Container
      key={gmail}
      display={"flex"}
      p={"3"}
      alignItems={"center"}
      gap={"3.5"}
      cursor={"pointer"}
      flexDirection="row"
      onClick={addFriend}
      _hover={{ bgColor: `${colorMode == "dark" ? "#8e9090" : "whitesmoke"}` }}
    >
      <Avatar
        size="md"
        name="dani"
        src={`https://avatars.dicebear.com/api/bottts/${username}.svg`}
      />

      <Flex flexDirection={"column"} gap={"2"}>
        <Text fontSize={"xl"} fontStyle={"oblique"} fontWeight={"bold"}>
          {username}
        </Text>

        <Text fontSize={"12"} fontWeight={"semibold"} fontStyle={"italic"}>
          {gmail}
        </Text>
      </Flex>
    </Container>
  );
}

export default UserCard;
