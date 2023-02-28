import React from "react";
import {
  useDisclosure,
  Modal,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Avatar,
  Container,
  Text,
  Flex,
  Tooltip,
} from "@chakra-ui/react";
export default function StatisticsView() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const data = {
    "63da050e2b9bdcf8fd819ddc": [
      {
        _id: "63da05382b9bdcf8fd819dfb",
        content: "hi",
        sender: {
          _id: "63d912b4f8bc673d6c98f7d2",
          username: "Dani",
          image:
            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        },
        chat: {
          _id: "63da050e2b9bdcf8fd819ddc",
          chatName: "sender",
          isGroupChat: false,
          users: ["63da04fb2b9bdcf8fd819dd4", "63d912b4f8bc673d6c98f7d2"],
          createdAt: "2023-02-01T06:22:06.095Z",
          updatedAt: "2023-02-01T06:22:57.411Z",
          __v: 0,
          latestMessage: "63da05412b9bdcf8fd819e1b",
        },
        isDeleted: false,
        createdAt: "2023-02-01T06:22:48.929Z",
        updatedAt: "2023-02-01T06:23:05.100Z",
        __v: 0,
      },
      {
        _id: "63da05412b9bdcf8fd819e1b",
        content: "hello",
        sender: {
          _id: "63da04fb2b9bdcf8fd819dd4",
          username: "sample1",
          image:
            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        },
        chat: {
          _id: "63da050e2b9bdcf8fd819ddc",
          chatName: "sender",
          isGroupChat: false,
          users: ["63da04fb2b9bdcf8fd819dd4", "63d912b4f8bc673d6c98f7d2"],
          createdAt: "2023-02-01T06:22:06.095Z",
          updatedAt: "2023-02-01T06:22:57.411Z",
          __v: 0,
          latestMessage: "63da05412b9bdcf8fd819e1b",
        },
        isDeleted: true,
        createdAt: "2023-02-01T06:22:57.393Z",
        updatedAt: "2023-02-01T06:23:11.751Z",
        __v: 0,
      },
    ],
  };
  return (
    <>
      <Tooltip placement="right-end" hasArrow label="Profile View">
        <Avatar
          cursor={"pointer"}
          onClick={onOpen}
          src={
            `https://avatars.dicebear.com/api/bottts/dani.svg`
            // "https://lh3.googleusercontent.com/a/AEdFTp7kiDrC2tOsV1S8_g-WJXQlmhRAFFZCYskUxGsYFA=s96-c"
          }
        />
      </Tooltip>
      <Modal size={"xl"} onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent
        // bgColor={"#1b1e20"}
        >
          <ModalHeader
            // color={"whiteAlpha.300"}
            fontSize={"3xl"}
            textTransform={"uppercase"}
            fontWeight={"extrabold"}
          >
            Statistics
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Container
              display={"flex"}
              alignItems={"center"}
              textAlign={"center"}
              gap={"5"}
              w={"100%"}
              flexDirection="row"
            >
              {/* <Avatar
                size="xl"
                name={"dani"}
                src={`https://avatars.dicebear.com/api/bottts/dani.svg`}
              /> */}

              <Flex flexDirection={"column"} w={"50%"} bgColor={"red"}>
                <Text
                  fontSize={"3xl"}
                  fontStyle={"oblique"}
                  fontWeight={"bold"}
                >
                  Dani
                </Text>
              </Flex>
              <Flex flexDirection={"column"} w={"50%"} bgColor={"blue"}>
                <Text
                  fontSize={"3xl"}
                  fontStyle={"oblique"}
                  fontWeight={"bold"}
                >
                  Dani
                </Text>
              </Flex>
              {/* <Text
                  fontSize={"3xl"}
                  fontStyle={"oblique"}
                  fontWeight={"bold"}
                >
                  {username}
                </Text>
                <Text
                  fontSize={"16"}
                  fontWeight={"semibold"}
                  fontStyle={"italic"}
                >
                  {gmail}
                </Text> */}
            </Container>

            {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea odit
            excepturi at eveniet libero molestias, laudantium necessitatibus
            quasi sed vitae cumque unde aliquam sint quaerat, officia sunt rerum
            quis eum. */}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
