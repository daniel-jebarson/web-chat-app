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
  InputRightElement,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { FaRegUser } from "react-icons/fa";
import { EmailIcon, ViewIcon, ViewOffIcon, LockIcon } from "@chakra-ui/icons";
import Axios from "axios";
import { useEffect } from "react";
const Register = () => {
  const toast = useToast();
  const [pass, setPass] = useState("");
  const [cpass, setcPass] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleShowClick = () => setShowPassword(!showPassword);
  const handleShowCClick = () => setShowCPassword(!showCPassword);
  // const postDetails = (img) => {
  //   setLoading(true);
  //   // if(img===undefined)
  // };

  useEffect(() => {
    let data = JSON.parse(localStorage.getItem("userInfo"));
    if (data) {
      window.location.href = "./chat";
    }
  }, []);

  const registerUser = async (e) => {
    e.preventDefault();
    if (pass !== cpass) {
      toast({
        title: `Password and Confirm password are not equal`,
        status: "error",
        isClosable: true,
      });
    } else {
      try {
        setLoading(true);
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        console.log(user, email, pass);
        const { data } = await Axios.post(
          "http://localhost:5000/user",
          {
            username: user,
            gmail: email,
            password: pass,
          },
          config
        );
        console.log(data);
        toast({
          title: "Registered Successfully",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "bottom",
        });
        localStorage.setItem("userInfo", JSON.stringify(data));
        setLoading(false);
        window.location.href = "./chat";
      } catch (err) {
        console.log(err);
        setLoading(false);
        // e.preventDefault();
        toast({
          title: "Error Occured!",
          description: err.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
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
          <form onSubmit={registerUser}>
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
                    children={<Icon as={FaRegUser} color="gray.500" />}
                  />
                  <Input
                    onChange={(e) => setUser(e.target.value)}
                    type="text"
                    placeholder="Username"
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
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement
                    pointerEvents="none"
                    color="gray.500"
                    children={<LockIcon color="gray.500" />}
                  />
                  <Input
                    onChange={(e) => setcPass(e.target.value)}
                    type={showCPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    required
                  />
                  <InputRightElement width="3.5rem">
                    <IconButton
                      h="1.75rem"
                      size="sm"
                      aria-label="ViewMode Changer"
                      icon={showCPassword ? <ViewOffIcon /> : <ViewIcon />}
                      onClick={handleShowCClick}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              {/* <FormControl>
                <Input
                  type="file"
                  p={1.5}
                  accept="image/*"
                  onChange={(e) => postDetails(e.target.files[0])}
                />
              </FormControl> */}

              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                isLoading={loading}
              >
                Register
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>
        Already have an account?{" "}
        <Link color="teal.500" href="/">
          Sign In
        </Link>
      </Box>
    </Flex>
  );
};

export default Register;
