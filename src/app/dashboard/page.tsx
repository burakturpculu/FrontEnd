import { Flex } from "@chakra-ui/layout";
import { Suspense } from "react";
import DashboardList from "./components/DashboardList";

export default function Page() {
  return (
    <Flex direction="column" flex="1 1 auto">
      <Suspense>
        <DashboardList />
      </Suspense>
    </Flex>
  );
}


