import React, { useState } from "react";

import { AddIcon } from "@chakra-ui/icons";

import {
  RadioGroup,
  Stack,
  Radio,
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
} from "@chakra-ui/react";
const SideDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setloading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);

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
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Add User</DrawerHeader>
          <DrawerBody>
            <Box
              d="flex"
              justifyContent={"center"}
              alignItems={"center"}
              pb={2}
            >
              <Input
                placeholder="Search by name or email"
                mr={2}
                width={"xs"}
                defaultValue={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button mb={"1.5"} colorScheme={"green"} onClick={""}>
                Add
              </Button>
            </Box>
            {/* {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )} */}
            {/* {loadingChat && <Spinner ml="auto" d="flex" />} */}
            <Spinner ml="auto" d="flex" />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
