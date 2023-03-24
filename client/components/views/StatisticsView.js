import React, { useState } from "react";
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
  IconButton,
  Flex,
  Tooltip,
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Td,
  Tbody,
  keyframes,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import Axios from "axios";
import { ImStatsDots } from "react-icons/im";
export default function StatisticsView({ chatId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const color = useColorModeValue("#000", "#fff");

  const [output, setOutput] = useState("");
  const toast = useToast();
  const getStatistics = async (id) => {
    await getStatsData(id);
  };

  const getStatsData = async (id) => {
    try {
      const user = JSON.parse(localStorage.getItem("userInfo"));
      // console.log(props);
      const config = {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await Axios.post(
        `${process.env.NEXT_PUBLIC_BACKENDURL}/chat/getStats`,
        {
          id: chatId,
        },
        config
      );
      setOutput(data);
      onOpen();
      console.log(data);
    } catch (err) {
      toast({
        title: "Error occured!",
        description: `Failed to get stats for chat ${chatId}`,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      console.log(err);
    }
  };

  return (
    <>
      <Tooltip placement="right-end" hasArrow label="Statistics View">
        <IconButton
          variant={"link"}
          color={color}
          size={"md"}
          onClick={() => getStatistics(chatId)}
          icon={<ImStatsDots />}
        />
      </Tooltip>
      <Modal
        scrollBehavior="inside"
        size={"xl"}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <ModalOverlay />
        <ModalContent
        // bgColor={"#1b1e20"}
        >
          <ModalHeader
            // color={"whiteAlpha.300"}
            fontSize={"4xl"}
            textTransform={"uppercase"}
            fontWeight={"extrabold"}
            textAlign={"center"}
          >
            Statistics Data
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Container
              display={"flex"}
              pt={"7"}
              alignItems={"center"}
              textAlign={"center"}
              justifyContent={"center"}
              gap={"20"}
              w={"200"}
              flexDirection="col"
              flexWrap={"wrap"}
            >
              {output == "" || output == null
                ? ""
                : Object.keys(output).map((v) => {
                    return (
                      <TableContainer
                        w={"80%"}
                        boxShadow="dark-lg"
                        cursor={"pointer"}
                        _hover={{
                          transform: "translateY(-7px) scale(1.035)",
                          transitionDuration: "300ms",
                        }}
                      >
                        <Text
                          textTransform={"uppercase"}
                          width={"100%"}
                          fontSize={"3xl"}
                          fontStyle={"italic"}
                          fontFamily={"fantasy"}
                        >
                          {v}
                        </Text>
                        <Table variant={"striped"} colorScheme={"messenger"}>
                          <Thead>
                            <Tr>
                              <Td>Name</Td>
                              <Td>Value</Td>
                            </Tr>
                          </Thead>
                          <Tbody>
                            {Object.keys(output[v]).map((val) => {
                              return (
                                <Tr>
                                  <Td>{val}</Td>
                                  <Td>{output[v][val]}</Td>
                                </Tr>
                              );
                            })}
                          </Tbody>
                        </Table>
                      </TableContainer>
                    );
                  })}
            </Container>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
