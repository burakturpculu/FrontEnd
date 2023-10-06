'use client';

import {
  AddIcon,
  ChevronDownIcon,
  EditIcon,
  InfoIcon,
  SearchIcon,
  SettingsIcon,
  TriangleDownIcon,
  CloseIcon,
} from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
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
const EMPTY_TASK: any = [];

export default function DashboardList() {
  // const accessToken = useAuthStore((state) => state.accessToken);
  // const refreshToken = useAuthStore((state) => state.refreshToken);
  const accessToken = window.localStorage.getItem('accessToken');
  const refreshToken = window.localStorage.getItem('refreshToken');
  const sessionId = window.localStorage.getItem('sessionId');

  const [searchTerm, setSearchTerm] = useState('');
  const headers = {
    authorization: `Bearer ${accessToken}`,
    refreshToken: refreshToken,
  };
  const [selectedLanguage, setSelectedLanguage] = useState('All');

  const handleLanguageSelect = (language: any) => {
    setSelectedLanguage(language);
  };

  const { data = EMPTY_TASK } = useQuery([Queries.GET_TASKS], {
    queryFn: async () =>
      (
        await API.get<any>(
          'https://newsapi.org/v2/top-headlines/sources?apiKey=d0c6003e6a754105b044a4730beb13d7',
          // {
          //   headers: headers,
          // },
        )
      ).data,
  });
  let filteredData;
  if (selectedLanguage != 'All') {
    filteredData = data.sources.filter(
      (item) => item.language === selectedLanguage,
    );
  } else {
    filteredData = data.sources.filter((item) =>
      item?.name?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }

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
            <Link href={`/auth`}>
              <Box display="flex" marginRight="10px">
                <Icon as={CloseIcon} w="24px" h="24px" />
              </Box>
            </Link>
            <Link href={`/user/edit/${sessionId}`}>
              <Box display="flex" marginRight="10px">
                <Icon as={SettingsIcon} w="24px" h="24px" />
              </Box>
            </Link>
            <Menu>
              <MenuButton as={InfoIcon} w="24px" h="24px">
                <ChevronDownIcon />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => handleLanguageSelect('All')}>
                  All
                </MenuItem>
                <MenuItem onClick={() => handleLanguageSelect('en')}>
                  EN
                </MenuItem>
                <MenuItem onClick={() => handleLanguageSelect('tr')}>
                  TR
                </MenuItem>
                <MenuItem onClick={() => handleLanguageSelect('it')}>
                  IT
                </MenuItem>
              </MenuList>
            </Menu>{' '}
          </Flex>
        </Flex>

        <Box>
          <Flex mt="30px">
            <Flex flex="1 1 auto">
              <Text fontWeight="bold">List Tasks</Text>
            </Flex>
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
                    description
                  </Th>
                  <Th fontSize="14" fontFamily="var(--font-dm-sans)">
                    url
                  </Th>
                  <Th fontSize="14" fontFamily="var(--font-dm-sans)">
                    category
                  </Th>
                  <Th fontSize="14" fontFamily="var(--font-dm-sans)">
                    language
                  </Th>
                  <Th fontSize="14" fontFamily="var(--font-dm-sans)">
                    country
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredData.map((value) => (
                  <Tr key={value.id}>
                    <Td fontSize="14" fontWeight="bold">
                      {value.id || '-'}
                    </Td>
                    <Td fontSize="14" fontWeight="bold">
                      {value.name || '-'}
                    </Td>
                    <Td fontSize="14" fontWeight="bold">
                      {value.description || '-'}
                    </Td>
                    <Td fontSize="14" fontWeight="bold">
                      {value.url || '-'}
                    </Td>
                    <Td fontSize="14" fontWeight="bold">
                      {value.category || '-'}
                    </Td>
                    <Td fontSize="14" fontWeight="bold">
                      {value.language || '-'}
                    </Td>
                    <Td fontSize="14" fontWeight="bold">
                      {value.country || '-'}
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
