import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  IconButton,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { FaRegUser } from "react-icons/fa";
import { EmailIcon, ViewIcon, ViewOffIcon, LockIcon } from "@chakra-ui/icons";
import Axios from "axios";
// import otpGenerator from "otp-generator";
import React, { useState, useEffect } from "react";
const OTP = () => {
  const [userData, setUserData] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const toast = useToast();
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("userInfo"));
    if (Object.keys(data).length == 0) {
      window.location.href = "./";
    } else if (data.verified) {
      window.location.href = "./chat";
    } else {
      setUserData(data);
    }
  }, []);

  const startTimer = async (time) => {
    async function sleep(milliseconds) {
      return await new Promise((resolve) => setTimeout(resolve, milliseconds));
    }
    while (time !== 0) {
      await sleep(1000);
      setTimeLeft(--time);
      // console.log(time);
    }
  };

  const sendOtp = async (e) => {
    e.preventDefault();
    setTimeLeft(120);
    try {
      const config = {
        headers: {
          authorization: `Bearer ${userData.token}`,
        },
      };

      let { data } = await Axios.post(
        `${process.env.NEXT_PUBLIC_BACKENDURL}/otp/send/${userData._id}`,
        { gmail: userData.gmail },
        config
      );
      toast({
        title: "OTP sent successfully!",
        description: "Check your email and activate the link",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      await startTimer(120);
    } catch (err) {
      toast({
        title: "Failed to send activation link!",
        description: err.response.data.msg,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setTimeLeft(0);
    }
  };

  return (
    <Flex
      flexDirection="column"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
        pt={"10"}
        bgColor={"whiteAlpha.900"}
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Verify the link</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form>
            <Stack
              spacing={4}
              px="1rem"
              py={"2rem"}
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    children={<EmailIcon color="gray.500" />}
                  />
                  <Input
                    type="email"
                    value={userData.gmail}
                    disabled
                    placeholder="email address"
                    required
                  />
                </InputGroup>
                {timeLeft == 0 ? (
                  <FormHelperText pl={"2"} color={"green"}>
                    Click the below button to resend link
                  </FormHelperText>
                ) : (
                  <FormHelperText pl={"2"} color={"red"}>
                    You can resend link in {timeLeft} secs
                  </FormHelperText>
                )}
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                isLoading={timeLeft !== 0}
                onClick={sendOtp}
              >
                Send Link
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Verified already?{" "}
        <Link color="teal.500" href="/">
          Sign in
        </Link>
      </Box>
    </Flex>
  );
};

export default OTP;
