import {
  Avatar,
  Flex,
  Text,
  Box,
  IconButton,
  Input,
  useToast,
} from "@chakra-ui/react";
import React, { Fragment, useState } from "react";
import { TbEdit } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { BiSave } from "react-icons/bi";
import DeletedMessage from "./DeletedMessage";
import { actionCreators } from "../../hooks";
import Axios from "axios";
export default function (props) {
  const toast = useToast();
  const dispatch = useDispatch();
  const [text, setText] = useState(props.message);
  const [updated, setUpdated] = useState(props.updated);
  const { EDITMESSAGE, DELETEMESSAGE } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const userData = useSelector((state) => state.user);
  const chatData = useSelector((state) => state.chat);
  const [editing, setEditing] = useState(false);
  const [isDeleted, setisDeleted] = useState(props.isDeleted);

  const handleDelete = async () => {
    try{

      const config = {
        headers: {
          authorization: `Bearer ${userData.token}`,
        },
       
      };
      const { data } = await Axios.delete(
        `http://localhost:5000/message/${props.id}`,
  
        config
      );
      if(data){
  
        setisDeleted(true);
        DELETEMESSAGE(chatData.id, props.num);
        let temp=data;
      temp["num"]=props.num;
      props.socket.emit("delete message",temp);
        toast({
          title: "Message deleted!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }else{
        toast({
          title: "Failed to delete message!",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }

    }catch(err){
      console.log(err);
      toast({
        title: "Failed to delete message!",
        description: err.response.data.msg,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };

  const handleEdit = async (e) => {
    setEditing(false);
    // setText(e.target.value);
    if (text == props.message) {
      return;
    }
    try {
      const config = {
        headers: {
          authorization: `Bearer ${userData.token}`,
        },
      };
      const { data: message } = await Axios.put(
        `http://localhost:5000/message/${props.id}`,
        {
          content: text,
        },
        config
      );
      // console.log(message);
      setUpdated(message.updatedAt);
      EDITMESSAGE(message, chatData.id, props.num);
      let temp=message;
      temp["num"]=props.num;
      props.socket.emit("edit message",temp);
      toast({
        title: "Message updated!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    } catch (err) {
      console.log(err);
      toast({
        title: "Failed to edit message!",
        description: err.response.data.msg,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
    // let message = messageData[chatData.id][props.num];
    // message["content"] = e.target.value;
  };
  return (
    <Fragment>
      {isDeleted == true ? (
        <Fragment>
          <DeletedMessage props={props} />
        </Fragment>
      ) : (
        <Flex
          key={props.id}
          justifyContent={"space-between"}
          flexDirection={props.isUser ? "row" : "row-reverse"}
          px={"4"}
        >
          <Box width={"36%"}></Box>
          <Flex
            minW={"40%"}
            // w={"100%"}
            px={"2"}
            py={"2"}
            mt={"4"}
            ml={"2"}
            height="fit-content"
            flexDirection={props.isUser ? "row-reverse" : "row"}
            bgColor={props.isUser ? "#1c2c3c" : "#23272A"}
            cursor="pointer"
            key={props.id}
            _hover={{ bgColor: props.isUser ? "#2a3a49" : "#2a2c2d" }}
            // mr={"30%"}
          >
            <Avatar
              mt={"3"}
              size="md"
              name={props.name}
              src={`https://avatars.dicebear.com/api/bottts/${props.name}.svg`}
            />
            <Flex
              flexGrow="1"
              flexDirection={"column"}
              justifyContent={"center"}
            >
              <Flex
                flexDirection={props.isUser ? "row-reverse" : "row"}
                h="7"
                pt={"2"}
                px={"4"}
                gap={"2.5"}
              >
                <Text
                  fontWeight={"bold"}
                  // updated
                  fontSize={"xl"}
                  position={"relative"}
                  top={"-2"}
                  color="whiteAlpha.700"
                >
                  {props.name.slice(0, 25) === props.name
                    ? props.name
                    : props.name.slice(0, 24) + "..."}
                </Text>
                <Text
                  fontSize={"12"}
                  position={"relative"}
                  top={"0"}
                  color={"white"}
                >
                  {new Date(props.time).toLocaleString()}
                  {/* {props.time} */}
                </Text>
              </Flex>
              <Flex>
                {editing ? (
                  <Input
                    defaultValue={props.message}
                    // textAlign={props.isUser ? "right" : "left"}
                    wordBreak={"break-word"}
                    px={"4"}
                    onChange={(e) => setText(e.target.value)}
                    py={"2.5"}
                    color={"white"}
                    onKeyPress={(e) => {
                      if (e.key == "Enter") {
                        handleEdit(e); // props.message = "dani";
                      }
                    }}
                  />
                ) : (
                  <Text
                    textAlign={props.isUser ? "right" : "left"}
                    wordBreak={"break-word"}
                    px={"4"}
                    py={"2.5"}
                    color={"white"}
                  >
                    {text}
                  </Text>
                )}
              </Flex>
              <Flex
                minHeight="2"
                px={"3.5"}
                flexDirection={props.isUser ? "row" : "row-reverse"}
              >
                <Text
                  color={"white"}
                  fontSize="11"
                  position={"relative"}
                  right="1"
                >
                  {/* {props.time} */}
                  {new Date(updated).toLocaleString()}
                </Text>
                {props.isUser && !editing ? (
                  <Box>
                    <IconButton
                      variant="link"
                      color={"white"}
                      size={"lg"}
                      onClick={() => setEditing(true)}
                      icon={<TbEdit />}
                    />
                    <IconButton
                      variant="link"
                      onClick={() => handleDelete()}
                      color={"white"}
                      size={"lg"}
                      icon={<MdDelete />}
                    />
                  </Box>
                ) : (
                  ""
                )}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      )}
    </Fragment>
  );
}
