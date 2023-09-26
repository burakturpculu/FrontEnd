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
import { useState } from 'react';
import * as Yup from 'yup';
import { Queries } from '../../constant/requests';
import { API } from '../../utils/api';
import wait from '../../utils/wait';
import { useAuthStore } from '@/app/stores/auth.store';

type Props = {
  id: string;
};

const EMPTY_TASK: MeloAppTask = {
  id: '',
  name: '',
  created_at: '',
  deleted_at: '',
  updated_at: '',
};

const schema: Yup.ObjectSchema<UpdateMeloAppTask> = Yup.object({
  name: Yup.string().required('name is required'),
}).shape({});

export default function EditUser(props: Props) {
  const accessToken = useAuthStore((state) => state.accessToken);

  const router = useRouter();
  const [save, setSave] = useState(false);
  const queryClient = useQueryClient();

  const clickHandler = () => {
    setSave(true);
  };
  const { data = EMPTY_TASK } = useQuery([Queries.GET_TASK, props.id], {
    queryFn: async () =>
      (await API.get<MeloAppTask>(`/tasks/${props.id}`)).data,
  });
  const editMutation = useMutation({
    mutationFn: (data: UpdateMeloAppTask) =>
      API.patch(`/tasks/${props.id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Queries.GET_TASKS],
        refetchType: 'all',
      });
      alert('task is edited');

      router.replace('/dashboard');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => API.delete(`/tasks/${props.id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [Queries.GET_TASKS],
        refetchType: 'all',
      });
      alert('task is deleted');
      router.replace('/dashboard');
    },
  });

  const initialValues: MeloAppTask = {
    id: data.id,
    name: data.name,
    created_at: data.created_at,
    updated_at: data.updated_at,
    deleted_at: data.deleted_at,
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
          if (editMutation.isLoading || deleteMutation.isLoading) {
            return;
          }
          if (!save) {
            deleteMutation.mutate();
          } else {
            const name = values.name;

            editMutation.mutate({ name });
          }
        }}
      >
        {({ errors, touched, values }) => (
          <Form style={{ flex: '0.75', marginTop: '30px' }}>
            <SimpleGrid columns={3} gap="5">
              <Flex direction="column" ml="5">
                <Flex direction="column">
                  <Text>Edit User</Text>
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
                <Button
                  w="128px"
                  isLoading={deleteMutation.isLoading}
                  flex="1"
                  type="submit"
                  color="red"
                >
                  Delete
                </Button>

                <Button
                  w="128px"
                  flex="1"
                  type="submit"
                  color="blue"
                  isLoading={editMutation.isLoading}
                  ml="5"
                  onClick={clickHandler}
                >
                  Save
                </Button>
              </Flex>
            </Flex>
          </Form>
        )}
      </Formik>
    </Flex>
  );
}
