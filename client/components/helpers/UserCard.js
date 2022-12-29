import React from "react";

import { Container, Avatar, Flex, Text } from "@chakra-ui/react";

function UserCard({ gmail, username }) {
  return (
    <Container
      key={gmail}
      display={"flex"}
      p={"3"}
      alignItems={"center"}
      gap={"3.5"}
      flexDirection="row"
      _hover={{ bgColor: "whitesmoke" }}
    >
      <Avatar
        size="md"
        name="dani"
        src={`https://avatars.dicebear.com/api/bottts/${username}.svg`}
      />

      <Flex flexDirection={"column"} gap={"2"}>
        <Text fontSize={"xl"} fontStyle={"oblique"} fontWeight={"bold"}>
          {username}
        </Text>

        <Text fontSize={"12"} fontWeight={"semibold"} fontStyle={"italic"}>
          {gmail}
        </Text>
      </Flex>
    </Container>
  );
}

export default UserCard;
