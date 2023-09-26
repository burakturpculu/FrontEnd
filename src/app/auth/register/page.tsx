'use client';

import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Stack,
  chakra,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaLock } from 'react-icons/fa';
import { API } from '../../utils/api';
import toast from 'react-hot-toast';
import { useAuthStore } from '../../stores/auth.store';

const CFaLock = chakra(FaLock);

const App = () => {
  // const setAccessToken = useAuthStore((state) => state.setAccessToken);
  // const setRefreshToken = useAuthStore((state) => state.setRefreshToken);

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleShowClick = () => setShowPassword(!showPassword);

  const login = useMutation({
    mutationFn: (response_data: MeloAppUser) =>
      API.post('/login', response_data),
    onSuccess: (response_data) => {
      const { data } = response_data;
      window.localStorage.setItem('accessToken', data.accessToken);
      window.localStorage.setItem('refreshToken', data.refreshToken);
      router.replace('/dashboard');
    },
    onError: () => {
      toast.error('Check Username and Password', {
        duration: 3000,
        position: 'top-right',
      });
    },
  });

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values) => {
          if (login.isLoading) {
            return;
          }

          login.mutate({ email: values.email, password: values.password });
        }}
      >
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar bg="teal.500" />
          <Heading color="teal.400">Welcome</Heading>
          <Box minW={{ base: '90%', md: '468px' }}>
            <Form>
              <Stack
                spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
              >
                <Field name="name">
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={Boolean(
                        form.errors.email && form.touched.email,
                      )}
                    >
                      <Input
                        type="name"
                        placeholder="Name"
                        id="name"
                        {...field}
                      />
                      <FormErrorMessage>required</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="email">
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={Boolean(
                        form.errors.email && form.touched.email,
                      )}
                    >
                      <Input
                        type="email"
                        placeholder="Email address"
                        id="email"
                        {...field}
                      />
                      <FormErrorMessage>required</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="password">
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={Boolean(
                        form.errors.password && form.touched.password,
                      )}
                    >
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents="none"
                          color="gray.300"
                          children={<CFaLock color="gray.300" />}
                        />
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Password"
                          id="password"
                          {...field}
                        />
                        <InputRightElement width="4.5rem">
                          <Button
                            h="1.75rem"
                            size="sm"
                            onClick={handleShowClick}
                          >
                            {showPassword ? 'Hide' : 'Show'}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>required</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Button
                  borderRadius={0}
                  type="submit"
                  variant="solid"
                  colorScheme="teal"
                  width="full"
                  isLoading={login.isLoading}
                >
                  Register
                </Button>
              </Stack>
            </Form>
          </Box>
        </Stack>
      </Formik>
    </Flex>
  );
};

export default App;
