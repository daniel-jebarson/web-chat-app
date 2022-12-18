import { AiOutlineSync } from "react-icons/ai";
import { FiHelpCircle } from "react-icons/fi";
import { BsAt } from "react-icons/bs";
import { Search2Icon } from "@chakra-ui/icons";
import { MdPersonRemoveAlt1 } from "react-icons/md";
import {
  Box,
  Icon,
  Flex,
  IconButton,
  Text,
  Container,
  InputGroup,
  Input,
  InputRightElement,
  usePrefersReducedMotion,
  keyframes,
} from "@chakra-ui/react";
function Navbar(props) {
  const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(5400deg); }`;
  const prefersReducedMotion = usePrefersReducedMotion();

  const animation = prefersReducedMotion
    ? undefined
    : `${spin} infinite 20s linear`;
  return (
    <Flex
      height={"16"}
      //   bgColor={"red"}
      flexDirection="row"
      alignItems={"center"}
      gap={"4"}
      px={"10"}
    >
      <Icon variant="link" color={"white"} size={"lg"} icon={<BsAt />} />
      <Text
        color={"white"}
        fontSize="20"
        fontWeight={"semibold"}
        fontStyle="oblique"
        ml="-1.5"
      >
        {props.name}
      </Text>
      <Container color="white">
        <InputGroup>
          <Input type="text" placeholder="Search Here" color="white" />
          <InputRightElement>
            <IconButton
              size="md"
              colorScheme="blackAlpha"
              aria-label="Get request"
              icon={<Search2Icon />}
            />
          </InputRightElement>
        </InputGroup>
      </Container>

      <IconButton
        variant="link"
        color={"white"}
        size={"lg"}
        icon={<MdPersonRemoveAlt1 />}
      />
      <IconButton
        variant="link"
        color={"white"}
        size={"lg"}
        icon={<FiHelpCircle />}
      />
      <IconButton
        variant="link"
        color={"white"}
        size={"lg"}
        icon={<AiOutlineSync />}
        _focus={{ animation: animation }}
        onClick={() => {
          window.location.href = window.location.href;
        }}
        // animation={animation}
      />
    </Flex>
  );
}

export default Navbar;
