import React, { useState, useRef, useEffect } from "react";

import { AddIcon } from "@chakra-ui/icons";
import ChatLoader from "../animation/ChatLoader";
import {
  Container,
  Input,
  Box,
  Spinner,
  Button,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  DrawerHeader,
  Tooltip,
  useToast,
  Stack,
} from "@chakra-ui/react";
import UserCard from "../helpers/UserCard";
import Axios from "axios";
import { useSelector } from "react-redux";

function SideDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [user, setUser] = useState("");
  const [loading, setloading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);
  const toast = useToast();
  const ref = useRef(null);

  const friendsData = useSelector((state) => state.friends);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userInfo")));
  }, []);

  const fetchUsers = async () => {
    if (search === "" || !search) {
      toast({
        title: "Please type username to search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      ref.current.focus();
      return;
    }

    try {
      setloading(true);
      // console.log(user.token);
      const config = {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await Axios.get(
        `http://localhost:5000/user?search=${search}`,
        config
      );

     
      setResult(
        data.filter(
          (d) => !friendsData.map((k) => k.username).includes(d.username)
        )
      );
      setloading(false);
    } catch (err) {
      setloading(false);
      console.log(err);
      toast({
        title: "Error Occured!",
        description: "Failed to search result",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  return (
    <>
      <Tooltip
        hasArrow
        label="Add new user"
        aria-label="A tooltip"
        placement="right-end"
      >
        <Button
          onClick={onOpen}
          _focus={{ boxShadow: "none" }}
          letterSpacing="wide"
          textTransform="uppercase"
          fontSize="md"
          leftIcon={<AddIcon color={"blackAlpha.500"} />}
        >
          New Chat
        </Button>
      </Tooltip>

      <Drawer placement={"start"} size={"sm"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent height={"100vh"}>
          <DrawerHeader borderBottomWidth="1px">Add User</DrawerHeader>
          <DrawerBody>
            <Box
              d="flex"
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"row"}
              pb={2}
              zIndex={"1"}
              width={"95%"}
            >
              <Input
                placeholder="Search by name or email"
                ref={ref}
                w={"74%"}
                width={"xs"}
                defaultValue={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button ml={"2"} colorScheme={"green"} onClick={fetchUsers}>
                Search
              </Button>
            </Box>
            <Stack mt={"4"}>
              {loading ? (
                <ChatLoader />
              ) : (
                result.map((v, i) => {
                  return (
                    <Box key={i}>
                      {" "}
                      <UserCard
                        data={v}
                        gmail={v.gmail}
                        username={v.username}
                      />
                    </Box>
                  );
                })
              )}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;
