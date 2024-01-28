import React from "react";

import {
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Flex,
  Container,
  Text,
  Stack,
  Avatar,
  Box,
} from "@chakra-ui/react";

function chatLoader({ number }) {
  return (
    <Stack mt={"3"}>
      {Array(number || 5)
        .fill("_")
        .map((_) => {
          return (
            <Container
              display={"flex"}
              p={"5"}
              alignItems={"center"}
              gap={"3.5"}
              flexDirection="row"
            >
              <SkeletonCircle size={"45"}>
                <Avatar
                  size="md"
                  name="dani"
                  src={`https://api.dicebear.com/7.x/bottts/svg?seed=dani`}
                />
              </SkeletonCircle>
              <Flex flexDirection={"column"} gap={"3"}>
                <Skeleton w={"125%"}>
                  <Text
                    fontSize={"xl"}
                    fontStyle={"oblique"}
                    fontWeight={"bold"}
                  >
                    Dani
                  </Text>
                </Skeleton>
                <Skeleton w={"125%"}>
                  <Text
                    fontSize={"12"}
                    fontWeight={"semibold"}
                    fontStyle={"italic"}
                  >
                    danieljebarson21@gmail.com
                  </Text>
                </Skeleton>
              </Flex>
            </Container>
          );
        })}
    </Stack>
  );
}

export default chatLoader;
