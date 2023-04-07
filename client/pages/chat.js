import {
  Box,
  Flex,
  Button,
  Avatar,
  Stack,
  IconButton,
  Icon,
  Spinner,
  useToast,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import MessageBox from "../components/core/MessageBox";
import Navbar from "../components/core/Navbar";
import FriendCard from "../components/helpers/FriendCard";
import { bindActionCreators } from "redux";
import SlideDrawer from "../components/misc/SideDrawer";
import { actionCreators } from "../hooks";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { FiLogOut } from "react-icons/fi";
import { useState, useEffect } from "react";
import MessageCard from "../components/helpers/MessageCard";
import { useDispatch, useSelector } from "react-redux";
import OverlayChat from "../components/misc/OverlayChat";
import PorfileView from "../components/views/ProfileView";
import Axios from "axios";
import HeaderMeta from "../components/meta/HeaderMeta";
import { io } from "socket.io-client";
import ScrollableFeed from "react-scrollable-feed";
import ChatLoader from "../components/animation/ChatLoader";

const ENDPOINT = `${process.env.NEXT_PUBLIC_BACKENDURL}`;
var socket, selectedChatCompare;
var selectedChat = {
  name: "",
  id: -1,
};

function Chat() {
  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();
  const colorIcon = useColorModeValue(<MoonIcon />, <SunIcon />);
  const bg = useColorModeValue("#fff", "#23272A");
  const dispatch = useDispatch();
  const {
    SETCHAT,
    SETUSER,
    SETFRIENDS,
    NOTIFYDELETEDCHAT,
    ADDUSERMESSAGE,
    EDITMESSAGE,
    ADDFRIEND,
    DELETEMESSAGE,
  } = bindActionCreators(actionCreators, dispatch);

  // const [socket, setSocket] = useState(null);
  const chatData = useSelector((state) => state.chat);
  const friendData = useSelector((state) => state.friends);
  const userData = useSelector((state) => state.user);
  const messageData = useSelector((state) => state.messages);

  const [socketConnected, setSocketConnected] = useState(false);
  const [currFriend, setCurrFriend] = useState("");
  const fetchMessages = async (username = chatData.name, id = chatData.id) => {
    if (chatData.id == -1) return;
    try {
      const config = {
        headers: {
          authorization: `Bearer ${userData.token}`,
        },
      };

      let { data } = await Axios.post(
        `${process.env.NEXT_PUBLIC_BACKENDURL}/message/${id}`,
        {},
        config
      );
      console.log(data);
      ADDUSERMESSAGE(id, data);
      SETCHAT(username, id);
      setCurrFriend(getFriendId(id));
      socket.emit("join chat", id);
    } catch (err) {
      console.log(err);
      toast({
        title: "Failed to fetch messages!",
        description: err.response.data.msg,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const getFriendId = (id) => {
    console.log("came");
    if (id == -1) return "";
    else {
      for (let i = 0; i < friendData.length; i++) {
        if (friendData[i]["chatId"] === id) return friendData[i]["id"];
      }
    }
    return "";
  };

  const fetchChatList = async (d) => {
    try {
      const config = {
        headers: {
          authorization: `Bearer ${d.token}`,
        },
      };
      let { data } = await Axios.get(
        `${process.env.NEXT_PUBLIC_BACKENDURL}/chat`,
        config
      );
      SETFRIENDS(data, d.username);
      // console.log(data);
    } catch (err) {
      console.log(err);
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
      return;
    } else if (!data.verified) {
      toast({
        title: "Verify email",
        description: "Verify the email with otp!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      sleep(3000);
      localStorage.clear();
      window.location.href = "./";
      return;
    } else {
      SETUSER(data);
      fetchChatList(data);
    }
  }, []);

  useEffect(() => {
    socket = io(ENDPOINT, { transports: ["websocket"] });

    socket.emit("setup", JSON.parse(localStorage.getItem("userInfo")));
    socket.on("connected", () => {
      setSocketConnected(true);
      console.log("connected to socket");
    });
  }, []);

  useEffect(() => {
    fetchMessages(selectedChat.name, selectedChat.id);
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  async function sleep(milliseconds) {
    return await new Promise((resolve) => setTimeout(resolve, milliseconds));
  }

  useEffect(() => {
    socket.on("deleted chat", (deletedChat) => {
      NOTIFYDELETEDCHAT(deletedChat.chatId);
      SETCHAT("", -1);
    });

    socket.on("added chat", (addedChat) => {
      console.log("message from server");
      console.log(addedChat);
      ADDFRIEND(addedChat);
      SETCHAT("", -1);
    });

    socket.on("update deleted", (deletedMessage) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare.id !== deletedMessage.chat._id
      ) {
        //give notifs
        console.log("notifs");
      } else {
        // console.log("deleted message");
        // console.log(deletedMessage);
        DELETEMESSAGE(deletedMessage.chat._id, deletedMessage.num);
        fetchMessages();
      }
    });

    socket.on("update edited", (editedMessage) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare.id !== editedMessage.chat._id
      ) {
        //give notifs
        console.log("notifs");
      } else {
        // console.log("edited message");
        // console.log(editedMessage);
        EDITMESSAGE(editedMessage, editedMessage.chat._id, editedMessage.num);
        fetchMessages();
      }
    });

    socket.on("message received", (newMessageReceived) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare.id !== newMessageReceived.chat._id
      ) {
        //give notifs
        console.log("notifs");
      } else {
        // console.log("new message");
        // console.log(newMessageReceived);
        dispatch({
          type: "ADD_MESSAGE",
          message: newMessageReceived,
          id: newMessageReceived.chat._id,
        });
        fetchMessages();
      }
    });
  });

  const logOut = async () => {
    // localStorage.clear();
    localStorage.removeItem("userInfo");
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

  return (
    <Flex m={"0"} p="0" flexDirection={"row"}>
      {/* <HeaderMeta
        content={"You can chat here with your friends and create friends"}
        title={"Chat for Web Chat App"}
      /> */}
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
            bgColor={colorMode == "light" ? "#fff" : "#171c1f"}
            borderRight={`1px solid ${
              colorMode == "light" ? "#c3cfd7" : "#2D3748"
            } `}
          >
            <PorfileView username={userData.username} gmail={userData.gmail} />
            <Stack isInline>
              <IconButton
                size="sm"
                isRound
                onClick={toggleColorMode}
                _focus={{ boxShadow: "none" }}
                icon={colorIcon}
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
            bg={colorMode == "light" ? "#eff5f5" : "#1b1e20"}
            flex="1"
          >
            <Flex direction="column" p={4}>
              <SlideDrawer socket={socket} />
            </Flex>
            <Flex flexDir={"column"} flexGrow="1" gap="2px">
              {friendData.map((v, i) => {
                return (
                  <Box
                    key={i}
                    onClick={() => {
                      socket.emit("join chat", v.chatId);
                      fetchMessages(v.username, v.chatId);
                      SETCHAT(v.username, v.chatId);
                      selectedChat = {
                        name: v.username,
                        id: v.chatId,
                      };
                    }}
                  >
                    <FriendCard
                      name={v.username}
                      id={v.chatId}
                      select={chatData.id}
                    />
                  </Box>
                );
              })}
            </Flex>
          </Flex>
        </Flex>
      </Box>
      <Flex
        p="0"
        m="0"
        flexDir={"column"}
        bgColor={colorMode == "light" ? "#fff" : "#23272A"}
        height="100vh"
        flexGrow={"1"}
      >
        {chatData.id == -1 ? (
          <OverlayChat />
        ) : (
          <Box>
            <Navbar
              socket={socket}
              name={chatData.name}
              friend={currFriend}
              id={chatData.id}
            />
            <Box
              bgColor={bg}
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
              <ScrollableFeed forceScroll={"false"}>
                <Flex flexDirection={"column"} px={"2"} pt={"4"} pb={"1"}>
                  {messageData[chatData.id] === undefined ? (
                    <chatLoader number={15} />
                  ) : (
                    messageData[chatData.id].map((v, i) => {
                      return (
                        <Box key={i}>
                          <MessageCard
                            socket={socket}
                            num={i}
                            isDeleted={v.isDeleted}
                            message={v.content}
                            name={v.sender.username}
                            id={v._id}
                            updated={v.updatedAt}
                            time={v.createdAt}
                            isUser={v.sender._id === userData._id}
                          />
                        </Box>
                      );
                    })
                  )}
                </Flex>
              </ScrollableFeed>
            </Box>
            <MessageBox socket={socket} />
          </Box>
        )}
      </Flex>
    </Flex>
  );
}

export default Chat;
