import {
  Box,
  Flex,
  Button,
  Avatar,
  Stack,
  IconButton,
  Icon,
  useToast,
} from "@chakra-ui/react";
import MessageBox from "../components/core/MessageBox";
import Navbar from "../components/core/Navbar";
import FriendCard from "../components/helpers/FriendCard";
import { bindActionCreators } from "redux";
import SlideDrawer from "../components/misc/SideDrawer";
import { actionCreators } from "../hooks";
import { SunIcon } from "@chakra-ui/icons";
import { FiLogOut } from "react-icons/fi";
import { useState, useEffect } from "react";
import MessageCard from "../components/helpers/MessageCard";
import { useDispatch, useSelector } from "react-redux";
import OverlayChat from "../components/misc/OverlayChat";
import PorfileView from "../components/views/ProfileView";
import Axios from "axios";
import { io } from "socket.io-client";
// import { socket } from "../util/socket";
// import { socket } from "../util/socket";
// const socket = io("http://localhost:5000");
// socket.emit("login", "dani" + Math.random());

function Chat() {
  const toast = useToast();
  const dispatch = useDispatch();
  const { SETCHAT, SETUSER, SETFRIENDS } = bindActionCreators(
    actionCreators,
    dispatch
  );

  // const [socket, setSocket] = useState(null);
  const chatData = useSelector((state) => state.chat);
  const friendData = useSelector((state) => state.friends);
  const userData = useSelector((state) => state.user);

  const fetchChatList = async (d) => {
    try {
      const config = {
        headers: {
          authorization: `Bearer ${d.token}`,
        },
      };
      let { data } = await Axios.get(`http://localhost:5000/chat`, config);
      SETFRIENDS(data, d.username);
      // console.log(data);
    } catch (err) {
      toast({
        title: "Failed to fetch chats!",
        description: err.response.data.msg,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      // console.log(err);
    }
  };

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("userInfo"));
    if (!data) {
      toast({
        title: "Session expired!",
        description: "Login again",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      sleep(2000);
      window.location.href = "./";
    } else {
      SETUSER(data);
    }

    fetchChatList(data);
  }, []);

  async function sleep(milliseconds) {
    return await new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  const logOut = async () => {
    localStorage.clear();
    toast({
      title: "Logging out ...",
      description: "Logged out successfully!",
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    await sleep(2500);
    window.location.href = "./";
  };

  // useEffect(() => {
  //   const socket = io("http://localhost:5000");
  //   // socket.emit("login", "dani" + Math.random());
  //   // console.log("ok");
  // }, [true]);
  // useEffect(() => {
  //   socket.on("online", (data) => {
  //     console.log(data);
  //   });
  // }, [socket]);
  // useEffect(() => {
  //   const newSocket = io("http://localhost:5000");
  //   setSocket(newSocket);
  //   try {
  //     return socket.disconnect();
  //   } catch {
  //     return "ok";
  //   }
  // }, []);

  // useEffect(() => {
  //   socket.emit("logine", { value: "dani" + Math.random() });
  //   console.log("ok");
  // }, [socket]);
  return (
    <Flex m={"0"} p="0" flexDirection={"row"}>
      <Box maxW="fit-content" p="0" m="0">
        <Flex
          direction="column"
          w="300px"
          h="100vh"
          overflowY="scroll"
          css={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          <Flex
            align="center"
            justify="space-between"
            position="sticky"
            top={0}
            zIndex={199}
            p={4}
            h={"81px"}
            borderBottom="1px solid"
            bgColor={"#23272A"}
            borderRight={"1px solid #2D3748"}
          >
            {/* <Avatar
              cursor={"pointer"}
              onClick={() => {
                console.log("ok");
              }}
              src={
                "https://lh3.googleusercontent.com/a/AEdFTp7kiDrC2tOsV1S8_g-WJXQlmhRAFFZCYskUxGsYFA=s96-c"
              }
            /> */}
            <PorfileView username={userData.username} gmail={userData.gmail} />
            <Stack isInline>
              <IconButton
                size="sm"
                isRound
                _focus={{ boxShadow: "none" }}
                icon={<SunIcon />}
              />

              <IconButton
                icon={<Icon as={FiLogOut} />}
                _focus={{ boxShadow: "none" }}
                size="sm"
                onClick={logOut}
                isRound
              />
            </Stack>
          </Flex>
          <Flex
            direction="column"
            borderRight="1px solid"
            borderColor={"gray.700"}
            bg={"#1b1e20"}
            flex="1"
          >
            <Flex direction="column" p={4}>
              <SlideDrawer />
            </Flex>
            <Flex flexDir={"column"} flexGrow="1" gap="2px">
              {friendData.map((v, i) => {
                return (
                  <Box
                    key={i}
                    onClick={() => {
                      SETCHAT(v.username, v._id);
                    }}
                  >
                    <FriendCard
                      name={v.username}
                      id={v._id}
                      select={chatData.id}
                    />
                  </Box>
                );
              })}
              {/* {Array(50)
                .fill("Daniel")
                .map((v, i) => {
                  return (
                    <Box
                      key={i}
                      onClick={() => {
                        SETCHAT(v, i);
                      }}
                    >
                      {" "}
                      <FriendCard name={v} id={i} select={chatData.id} />
                    </Box>
                  );
                })} */}
            </Flex>
          </Flex>
        </Flex>
      </Box>
      <Flex
        p="0"
        m="0"
        flexDir={"column"}
        bgColor={"#23272A"}
        height="100vh"
        flexGrow={"1"}
      >
        {chatData.id == -1 ? (
          <OverlayChat />
        ) : (
          <Box>
            <Navbar name={chatData.name} id={chatData.id} />
            <Box
              bgColor={"#23272A"}
              overflowY="scroll"
              height={"80vh"}
              mb={"4"}
              py={"2"}
              css={{
                "&::-webkit-scrollbar": {
                  display: "none",
                },
                msOverflowStyle: "none",
                scrollbarWidth: "none",
              }}
            >
              <Flex flexDirection={"column"} px={"2"} pt={"4"} pb={"1"}>
                {Array(50)
                  .fill("dani")
                  .map((val, i) => {
                    return (
                      <MessageCard
                        id={i}
                        name={val}
                        message={
                          "dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd"
                        }
                        time={"19-12-22 11:23PM"}
                        isUser={Math.random() < 0.5}
                      />
                    );
                  })}
              </Flex>
            </Box>
            <MessageBox />
          </Box>
        )}
      </Flex>
    </Flex>
  );
}

export default Chat;
