import { Flex, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";

const Custom404 = () => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      height="100vh"
      flexDirection="column"
      textAlign="center"
    >
      <Heading fontSize="6xl">404</Heading>
      <Text fontSize="2xl" mb={8}>
        Oops! The page you requested could not be found.
      </Text>
      <Link href="/">
        <Text fontSize="xl" fontWeight="bold" textDecoration="underline">
          Go back home
        </Text>
      </Link>
    </Flex>
  );
};

export default Custom404;
