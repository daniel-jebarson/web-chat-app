import { AiOutlineSync } from "react-icons/ai";
import { FiHelpCircle } from "react-icons/fi";

import { Search2Icon, AtSignIcon } from "@chakra-ui/icons";
import { MdPersonRemoveAlt1 } from "react-icons/md";
import {
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
      height={"8vh"}
      flexDirection="row"
      alignItems={"center"}
      gap={"4"}
      px={"10"}
      pt="5"
    >
      <AtSignIcon boxSize={"5"} color="whiteAlpha.500" />
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
