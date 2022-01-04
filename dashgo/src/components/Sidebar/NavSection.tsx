import { Box, Stack, Text } from "@chakra-ui/react";
import { ReactNode } from "toasted-notes/node_modules/@types/react";

interface NavSectionProps {
  title: string;
  children: ReactNode;
}

export function NavSection({ children, title }: NavSectionProps) {
  return (
    <Box>
      <Text color="gray.400" fontWeight="bold" fontSize="small">
        {title}
      </Text>

      <Stack spacing="4" mt="8" align="stretch">
        {children}
      </Stack>
    </Box>
  );
}
