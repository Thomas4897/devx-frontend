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
import { useUser } from '../../redux/userState'
import { useNavigate } from 'react-router-dom';
import APIaxios from '../../Axios';

// const axios = require('axios').default;

export default function LoginPage2(props) {
  const { user, logIn } = useUser();
  const navigate = useNavigate();
  const [type, toggle] = useToggle('login', ['login', 'register']);
  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      image: '',
      terms: true,
    },


    validationRules: {
      email: (val) => /^\S+@\S+$/.test(val),
      password: (val) => val.length >= 6,
    },
  });

  const onSubmitLogin = async () => {
    APIaxios.post('/users/sign-in', {
      credentials:
      {
        email: form.values.email,
        password: form.values.password
      }
    })
      .then((response) => {
        // Put the resulting user data in react context over the entire application
        // That it can be accessed from any component in the component tree.
        // console.log('login:', response.data)
        logIn(response.data);
        navigate("/user-page");
        console.log('user logged in.');
      }).catch((error) => {
        console.log('Unable to log in.');
        console.log('error:', error);
      });
  };

  const onSubmitRegister = async () => {
    const response = APIaxios.post(`/users/create-user`, {
      firstName: form.values.firstName,
      lastName: form.values.lastName,
      image: form.values.image.length > 0 ? form.values.image : "none",
      email: form.values.email,
      password: form.values.password,
      authorName: form.values.firstName + " " + form.values.lastName,
      authorImage: form.values.image.length > 0 ? form.values.image : "none"
    })
      .then((response) => {
        console.log('New user successfully created', response.data);
        // toggle("login");
        console.log('register:', response.data.payload)
        logIn(response.data.payload);
        navigate("/user-page");
      });
    return response;
  };

  return (
    <Layout>
      <Paper style={{ width: "400px" }} radius="md" p="xl" withBorder {...props}>
        <Text size="lg" weight={500}>
          Welcome to DevX, {type} with
        </Text>
        <Group>
          <div>Hello, {user ? user.firstName : "Guest"}</div>
        </Group>
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
                autoComplete='firstName'
                value={form.values.firstName}
                onChange={(event) => form.setFieldValue('firstName', event.currentTarget.value)}
              />
            )}


            {type === 'register' && (
              <TextInput
                label="Last Name"
                placeholder="Last Name"
                autoComplete='lastName'
                value={form.values.lastName}
                onChange={(event) => form.setFieldValue('lastName', event.currentTarget.value)}
              />
            )}

            {type === 'register' && (
              <TextInput
                // required
                label="Profile Image"
                placeholder="Profile Image"
                autoComplete='authorImage'
                value={form.values.image}
                onChange={(event) => form.setFieldValue('image', event.currentTarget.value)}
              // error={form.errors.email && 'Invalid email'}
              />
            )}

            <TextInput
              required
              label="Email"
              placeholder="hello@mantine.dev"
              autoComplete='userName'
              value={form.values.email}
              onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
              error={form.errors.email && 'Invalid email'}
            />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              autoComplete='new-password'
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