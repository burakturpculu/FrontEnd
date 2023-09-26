'use client';

import { AddIcon, EditIcon, SearchIcon, SettingsIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Queries } from '../../constant/requests';
import { API } from '@/app/utils/api';
import { useAuthStore } from '@/app/stores/auth.store';
import { useState } from 'react';

const EMPTY_MELOAPP_TASK: MeloAppTask[] = [];

export default function DashboardList() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const refreshToken = useAuthStore((state) => state.refreshToken);
  const [searchTerm, setSearchTerm] = useState('');
  const headers = {
    authorization: `Bearer ${accessToken}`,
    refreshToken: refreshToken,
  };
  const { data = EMPTY_MELOAPP_TASK } = useQuery([Queries.GET_TASKS], {
    queryFn: async () =>
      (
        await API.get<MeloAppTask[]>('/tasks', {
          headers: headers,
        })
      ).data,
  });
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  return (
    <Flex flex="1 1 auto" direction="column">
      <Box
        flex={1}
        mb={'4'}
        mt="7"
        p="7"
        boxShadow="14px 17px 40px 4px rgba(112, 144, 176, 0.08)"
        borderRadius=" 30px"
      >
        <Flex flex="1 1 auto" direction="row" justify="space-between">
          <SimpleGrid column={2}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                _placeholder={{
                  color: 'gray.400', // Placeholder rengi
                  transform: searchTerm ? 'translateY(-1rem)' : 'none', // Kayma animasyonu
                  transition: 'transform 0.2s ease', // Geçiş süresi ve kolaylık fonksiyonu
                }}
              />
            </InputGroup>
          </SimpleGrid>
          <Flex>
            <Link href={`/user/edit`}>
              <Box display="flex">
                <Icon as={SettingsIcon} w="24px" h="24px" />
              </Box>
            </Link>
          </Flex>
        </Flex>

        <Box>
          <Flex mt="30px">
            <Flex flex="1 1 auto">
              <Text fontWeight="bold">List Tasks</Text>
            </Flex>

            <Link href={`/dashboard/create`}>
              <Box display="flex" justifyItems="center">
                <Icon as={AddIcon} w="24px" h="24px" />
              </Box>
            </Link>
          </Flex>
          <Box overflowX="scroll">
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
                {filteredData.map((value: MeloAppTask) => (
                  <Tr key={value.id}>
                    <Td fontSize="14" fontWeight="bold">
                      {value.id || '-'}
                    </Td>
                    <Td fontSize="14" fontWeight="bold">
                      {value.name || '-'}
                    </Td>
                    <Td fontSize="14" fontWeight="bold">
                      {value.created_at || '-'}
                    </Td>
                    <Td fontSize="14" fontWeight="bold">
                      {value.updated_at || '-'}
                    </Td>
                    <Td fontSize="14" fontWeight="bold">
                      {value.deleted_at || '-'}
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
