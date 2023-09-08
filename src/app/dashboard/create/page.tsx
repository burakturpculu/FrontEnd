import { Flex } from "@chakra-ui/layout";
import { Suspense } from "react";
import CreateTask from "../components/CreateTask";

export default function CreatePage() {
  return (
    <Flex direction="column" flex="1 1 auto">
      <Suspense>
        <CreateTask />
      </Suspense>
    </Flex>
  );
}
