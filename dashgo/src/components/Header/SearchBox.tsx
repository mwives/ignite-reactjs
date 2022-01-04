import { useRef } from "react";
import { Flex, Icon, Input } from "@chakra-ui/react";

import { RiSearchLine } from "react-icons/ri";

export function SearchBox() {
  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <Flex
      as="label"
      position="relative"
      flex="1"
      alignSelf="center"
      maxW="400px"
      borderRadius="full"
      px="8"
      py="4"
      ml="6"
      color="gray.200"
      bg="gray.800"
    >
      <Input
        variant="unstyled"
        placeholder="Buscar na plataforma"
        px="4"
        mr="4"
        color="gray.500"
        _placeholder={{ color: "gray.400" }}
        ref={searchInputRef}
      />

      <Icon as={RiSearchLine} fontSize="20" />
    </Flex>
  );
}
