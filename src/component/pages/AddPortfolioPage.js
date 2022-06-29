import React from 'react';
import { useForm } from '@mantine/hooks';
import {
  TextInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
} from '@mantine/core';
import Layout from '../Layout';
import { useUser } from '../../redux/userState'
import { useNavigate } from 'react-router-dom';
import APIaxios from '../../Axios';

export default function AddPortfolioCard(props) {
  const { user } = useUser();
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      image: '',
      link: '',
      title: '',
      description: '',
    },
  });

  const onSubmitPortfolioCard = async () => {
    const response = APIaxios.post(`/portfolioItems/create-portfolio-item`,
      {
        userId: user.id,
        portfolioItem: {
          image: form.values.image,
          link: form.values.link,
          title: form.values.title,
          description: form.values.description,
        }
      })
      .then((response) => {
        console.log('New portfolio card successfully created', response.data);
        navigate("/user-page")
      }).catch((error) => {
        console.log('Unable to create new portfolio card.');
        console.log('error:', error);
      });
    return response;
  };

  return (
    <Layout>
      <Paper style={{ width: "400px" }} radius="md" p="xl" withBorder {...props}>
        <Group>
          <div>Hello, {user ? user.firstName : "Guest"}</div>
        </Group>
        <Text size="lg" weight={500}>
          Add Portfolio Card
        </Text>

        <Divider label="" labelPosition="center" my="lg" />

        <form
          onSubmit={form.onSubmit(onSubmitPortfolioCard)}
        >
          <Group direction="column" grow>

            <TextInput
              required
              label="Image Address"
              placeholder="Image Address"
              autoComplete='imageAdress'
              value={form.values.image}
              onChange={(event) => form.setFieldValue('image', event.currentTarget.value)}
            />

            <TextInput
              required
              label="Project Link"
              placeholder="Project Link"
              autoComplete='link'
              value={form.values.link}
              onChange={(event) => form.setFieldValue('link', event.currentTarget.value)}
            />

            <TextInput
              required
              label="Title"
              placeholder="Title"
              autoComplete='title'
              value={form.values.title}
              onChange={(event) => form.setFieldValue('title', event.currentTarget.value)}
            // error={form.errors.email && 'Invalid email'}
            />

            <TextInput
              required
              label="Description"
              placeholder="Description"
              autoComplete='description'
              value={form.values.description}
              onChange={(event) => form.setFieldValue('description', event.currentTarget.value)}
            // error={form.errors.password && 'Password should include at least 6 characters'}
            />
          </Group>

          <Group position="center" mt="xl">
            <Button type="submit" onClick={async () => {
            }}>Create New Portfolio Card</Button>
          </Group>
        </form>
      </Paper>
    </Layout>
  );
}