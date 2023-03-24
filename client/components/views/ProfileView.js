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
  useColorModeValue,
} from "@chakra-ui/react";
export default function ProfileView({ username, gmail }) {
  const color = useColorModeValue("#3b3838", "#a49e9e");
  const headcolor = useColorModeValue("#3a3838", "#fff");
  const bgcolor = useColorModeValue("#fff", "#1b1e20");
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Tooltip placement="right-end" hasArrow label="Profile View">
        <Avatar
          cursor={"pointer"}
          onClick={onOpen}
          src={
            `https://avatars.dicebear.com/api/bottts/${username}.svg`
            // "https://lh3.googleusercontent.com/a/AEdFTp7kiDrC2tOsV1S8_g-WJXQlmhRAFFZCYskUxGsYFA=s96-c"
          }
        />
      </Tooltip>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent bgColor={bgcolor}>
          <ModalHeader
            color={headcolor}
            fontSize={"3xl"}
            textTransform={"uppercase"}
            fontWeight={"extrabold"}
          >
            Profile
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Container
              display={"flex"}
              alignItems={"center"}
              gap={"5"}
              flexDirection="row"
            >
              <Avatar
                size="xl"
                name={username}
                src={`https://avatars.dicebear.com/api/bottts/${username}.svg`}
              />
              <Flex flexDirection={"column"} color={color}>
                <Text
                  fontSize={"3xl"}
                  fontStyle={"oblique"}
                  fontWeight={"bold"}
                  wordBreak={"break-all"}
                >
                  {username}
                </Text>
                <Text
                  fontSize={"16"}
                  fontWeight={"semibold"}
                  fontStyle={"italic"}
                  wordBreak={"break-all"}
                >
                  {gmail}
                </Text>
              </Flex>
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
