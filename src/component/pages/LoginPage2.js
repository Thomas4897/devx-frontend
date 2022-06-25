import React from 'react';
import { useForm, useToggle, upperFirst } from '@mantine/hooks';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Checkbox,
  Anchor,
} from '@mantine/core';
import Layout from '../Layout';
const axios = require('axios').default;
// const bcrypt = require('bcryptjs');
// import { GoogleButton, TwitterButton } from '../SocialButtons/SocialButtons';

export default function LoginPage2(props) {
  const [type, toggle] = useToggle('login', ['login', 'register']);
  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      terms: true,
    },

    validationRules: {
      email: (val) => /^\S+@\S+$/.test(val),
      password: (val) => val.length >= 6,
    },
  });

  const onSubmitLogin = async () => {
    const response = axios.get(`http://localhost:4000/users/get-user/${form.values.email}/${form.values.password}`,
    ).then((response) => {
      console.log(response.data)
      return response.data;
    });
    return response;
  };

  const onSubmitRegister = async () => {
    const response = axios.post(`http://localhost:4000/users/create-user`, {
      firstName: form.values.firstName,
      lastName: form.values.lastName,
      email: form.values.email,
      password: form.values.password
    })
      .then((response) => {
        console.log(response.data)
        return response.data;
      });
    return response;
  };

  return (
    <Layout>
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" weight={500}>
          Welcome to DevX, {type} with
        </Text>

        <Group grow mb="md" mt="md">
          <Button radius="xl">Google</Button>
          <Button radius="xl">Twitter</Button>
        </Group>

        <Divider label="Or continue with email" labelPosition="center" my="lg" />

        <form
        onSubmit={form.onSubmit(type === "login" ? onSubmitLogin : onSubmitRegister)}
        >
          <Group direction="column" grow>
            {type === 'register' && (
              <TextInput
                label="First Name"
                placeholder="First Name"
                value={form.values.firstName}
                onChange={(event) => form.setFieldValue('firstName', event.currentTarget.value)}
              />
            )}


            {type === 'register' && (
              <TextInput
                label="Last Name"
                placeholder="Last Name"
                value={form.values.lastName}
                onChange={(event) => form.setFieldValue('lastName', event.currentTarget.value)}
              />
            )}

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              error={form.errors.email && 'Invalid email'}
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
              error={form.errors.password && 'Password should include at least 6 characters'}
            />

            {type === 'register' && (
              <Checkbox
                label="I accept terms and conditions"
                checked={form.values.terms}
                onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
              />
            )}
          </Group>

          <Group position="apart" mt="xl">
            <Anchor component="button" type="button" color="gray" onClick={() => toggle()} size="xs">
              {type === 'register'
                ? 'Already have an account? Login'
                : "Don't have an account? Register"}
            </Anchor>
            <Button type="submit" onClick={async () => {
              // type === "login" ? onSubmitLogin() : onSubmitRegister()
            }}>{upperFirst(type)}</Button>
          </Group>
        </form>
      </Paper>
    </Layout>
  );
}