import React from "react";
import { bindActionCreators } from "redux";
import { Container, Avatar, Flex, Text, useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { actionCreators } from "../../hooks";
import Axios from "axios";
function UserCard({ gmail, username, data: user_Data }) {
  const toast = useToast();
  const dispatch = useDispatch();
  const { ADDFRIEND } = bindActionCreators(actionCreators, dispatch);
  const addFriend = async () => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    try {
      const config = {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await Axios.post(
        `http://localhost:5000/chat`,
        { userId: user_Data._id },
        config
      );
      // console.log(data);
      toast({
        title: "User added!",
        description: `Created chat for ${username}`,
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      ADDFRIEND(user_Data);
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
    // console.log(data);
  };
  return (
    <Container
      key={gmail}
      display={"flex"}
      p={"3"}
      alignItems={"center"}
      gap={"3.5"}
      flexDirection="row"
      onClick={addFriend}
      _hover={{ bgColor: "whitesmoke" }}
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
