'use client';

import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Field, Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import { Queries } from '../../constant/requests';
import { API } from '../../utils/api';
import wait from '../../utils/wait';
import { meloTask } from '../data/data';

const EMPTY_TASK: MeloAppTask = {
  id: '',
  name: '',
  created_at: '',
  deleted_at: '',
  updated_at: '',
};

const schema: Yup.ObjectSchema<CreateMeloAppTask> = Yup.object({
  name: Yup.string().required('name is required'),
}).shape({});

export default function CreateTask() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data = EMPTY_TASK } = useQuery([Queries.GET_TASK], {
    queryFn: async () => (await API.get<CreateMeloAppTask>(`/tasks`)).data,
  });
  const mutation = useMutation({
    mutationFn: (data: CreateMeloAppTask) => API.post('/tasks', data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Queries.GET_TASKS],
        refetchType: 'all',
      });
      alert('task is create');

      router.replace('/dashboard');
    },
  });

  const initialValues: CreateMeloAppTask = {
    name: '',
  };

  return (
    <Flex direction="column" flex="1 1 auto">
      <Button
        as={Link}
        href={'/dashboard'}
        display="flex"
        justify-content="center"
        width="128px"
        height="40px"
        mt="8"
        marginInlineStart="4"
      >
        Back
      </Button>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values) => {
          if (mutation.isLoading) {
            return;
          }

          mutation.mutate(values);
        }}
      >
        {({ errors, touched, values }) => (
          <Form style={{ flex: '0.75', marginTop: '30px' }}>
            <SimpleGrid columns={3} gap="5">
              <Flex direction="column" ml="5">
                <Flex direction="column">
                  <Text fontSize="24px">Create Page</Text>
                </Flex>
              </Flex>

              <Flex direction="column" flex="1" mt="5">
                <Field name="name">
                  {({ field, form }: any) => (
                    <FormControl
                      isInvalid={Boolean(form.errors.name && form.touched.name)}
                    >
                      <FormLabel
                        htmlFor="name"
                        display="flex"
                        alignItems="center"
                      >
                        Name
                        <Text>*</Text>
                      </FormLabel>
                      <Input {...field} />
                      {form.errors.name && form.touched.name && (
                        <FormErrorMessage>
                          {'Name is required'}
                        </FormErrorMessage>
                      )}
                    </FormControl>
                  )}
                </Field>
              </Flex>
            </SimpleGrid>

            <Flex mt="7" justifyContent="center">
              <Flex direction="row">
                <Button isLoading={mutation.isLoading} type="submit">
                  Create
                </Button>
              </Flex>
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  );
}
