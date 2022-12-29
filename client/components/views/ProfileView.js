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
export default function ProfileView({ username, gmail }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Tooltip placement="right-end" hasArrow label="Profile View">
        <Avatar
          cursor={"pointer"}
          onClick={onOpen}
          src={
            "https://lh3.googleusercontent.com/a/AEdFTp7kiDrC2tOsV1S8_g-WJXQlmhRAFFZCYskUxGsYFA=s96-c"
          }
        />
      </Tooltip>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent bgColor={"#1b1e20"}>
          <ModalHeader
            color={"whiteAlpha.300"}
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
                name="Christian Nwamba"
                src={`https://avatars.dicebear.com/api/bottts/${username}.svg`}
              />
              <Flex flexDirection={"column"} color={"white"}>
                <Text
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
