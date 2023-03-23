import { useState } from "react";
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

import { useEffect } from "react";

import { EmailIcon, ViewIcon, ViewOffIcon, LockIcon } from "@chakra-ui/icons";
import Axios from "axios";

const Home = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const toast = useToast();
  const handleShowClick = () => setShowPassword(!showPassword);

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("userInfo"));
    if (data && data.verified) {
      window.location.href = "./chat";
    }
  }, []);

  const loginUser = async (e) => {
    async function sleep(milliseconds) {
      return await new Promise((resolve) => setTimeout(resolve, milliseconds));
    }
    setLoading(true);
    e.preventDefault();
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const { data } = await Axios.post(
        "http://localhost:5000/user/login",
        {
          gmail: email,
          password: pass,
        },
        config
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      if (!data.verified) {
        window.location.href = "./otp";
        return;
      }
      toast({
        title: "Logged in Successfully!",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      // console.log(data);

      await sleep(3000);
      setLoading(false);
      window.location.href = "./chat";
    } catch (err) {
      toast({
        title: "Error Occured!",
        description: err.response.data.msg,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      // console.log(err);
      setLoading(false);
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
        <Heading color="teal.400">Welcome</Heading>
        <Box minW={{ base: "90%", md: "468px" }}>
          <form onSubmit={loginUser}>
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
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="email address"
                    required
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.500"
                    children={<LockIcon color="gray.500" />}
                  />
                  <Input
                    onChange={(e) => setPass(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    required
                  />
                  <InputRightElement width="3.5rem">
                    <IconButton
                      h="1.75rem"
                      size="sm"
                      aria-label="ViewMode Changer"
                      icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                      onClick={handleShowClick}
                    />
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right">
                  <Link>forgot password?</Link>
                </FormHelperText>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                isLoading={loading}
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Register here?{" "}
        <Link color="teal.500" href="/register">
          Sign Up
        </Link>
      </Box>
    </Flex>
  );
};

export default Home;
