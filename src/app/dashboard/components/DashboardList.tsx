"use client";

import { AddIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Icon,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { Queries } from "../../constant/requests";
import { API } from "@/app/utils/api";

const EMPTY_MELOAPP_TASK: MeloAppTask[] = [];

export default function DashboardList() {
  const { data = EMPTY_MELOAPP_TASK } = useQuery([Queries.GET_TASKS], {
    queryFn: async () => (await API.get<MeloAppTask[]>("/tasks")).data,
  });

  return (
    <Flex flex="1 1 auto" direction="column">
      <Box
        flex={1}
        mb={"4"}
        mt="7"
        p="7"
        boxShadow="14px 17px 40px 4px rgba(112, 144, 176, 0.08)"
        borderRadius=" 30px"
      >
        <Box>
          <Flex>
            <Flex flex="1 1 auto">
              <Text fontWeight="bold">List Tasks</Text>
            </Flex>
            <Link href={`/dashboard/create`}>
              <Box display="flex" justifyItems="center">
                <Icon as={AddIcon} w="24px" h="24px" />
              </Box>
            </Link>
          </Flex>

          <Box overflowX="scroll" mt="7">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th fontSize="14" fontFamily="var(--font-dm-sans)">
                    id
                  </Th>
                  <Th fontSize="14" fontFamily="var(--font-dm-sans)">
                    name
                  </Th>
                  <Th fontSize="14" fontFamily="var(--font-dm-sans)">
                    created at
                  </Th>
                  <Th fontSize="14" fontFamily="var(--font-dm-sans)">
                    update at
                  </Th>
                  <Th fontSize="14" fontFamily="var(--font-dm-sans)">
                    deleted at
                  </Th>
                  <Th fontSize="14" fontFamily="var(--font-dm-sans)">
                    edit
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((value: MeloAppTask) => (
                  <Tr key={value.id}>
                    <Td fontSize="14" fontWeight="bold">
                      {value.id}
                    </Td>
                    <Td fontSize="14" fontWeight="bold">
                      {value.name}
                    </Td>
                    <Td fontSize="14" fontWeight="bold">
                      {value.created_at || "-"}
                    </Td>
                    <Td fontSize="14" fontWeight="bold">
                      {value.updated_at || "-"}
                    </Td>
                    <Td fontSize="14" fontWeight="bold">
                      {value.deleted_at || "-"}
                    </Td>
                    <Td>
                      <Link href={`/dashboard/edit/${value.id}`}>
                        <Box display="flex" justifyItems="center">
                          <Icon as={EditIcon} w="24px" h="24px" />
                        </Box>
                      </Link>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}
