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
import * as Yup from 'yup';

const CFaLock = chakra(FaLock);

const schema: Yup.ObjectSchema<any> = Yup.object({
  name: Yup.string().required('name is required'),
  password: Yup.string().required('password is required'),
  surname: Yup.string().required('surname is required'),
  email: Yup.string().required('email is required'),
}).shape({});

const App = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleShowClick = () => setShowPassword(!showPassword);

  const register = useMutation({
    mutationFn: (response_data: newUser) =>
      API.post('/user/save', response_data),
    onSuccess: () => {
      router.replace('/auth');
    },
    onError: (error) => {
      toast.error(error.message, {
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
        initialValues={{ email: '', password: '', name: '', surname: '' }}
        validationSchema={schema}
        onSubmit={(values) => {
          if (register.isLoading) {
            return;
          }

          register.mutate({
            email: values.email,
            password: values.password,
            name: values.name,
            surname: values.surname,
          });
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
                      isInvalid={Boolean(form.errors.name && form.touched.name)}
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
                <Field name="surname">
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={Boolean(
                        form.errors.surname && form.touched.surname,
                      )}
                    >
                      <Input
                        type="surname"
                        placeholder="surname"
                        id="surname"
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
                  as={Link}
                  href={'/auth'}
                  variant="solid"
                  colorScheme="teal"
                  width="full"
                  borderRadius={0}
                >
                  Back
                </Button>
                <Button
                  borderRadius={0}
                  type="submit"
                  variant="solid"
                  colorScheme="teal"
                  width="full"
                  isLoading={register.isLoading}
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
