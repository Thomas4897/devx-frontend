import React, { useState } from 'react';
import { TextInput, PasswordInput, Tooltip, Center, Text, Button } from '@mantine/core';
import { InfoCircle } from 'tabler-icons-react';
import Layout from '../Layout';

function TooltipFirstName() {
    const rightSection = (
      <Tooltip
        label="We store your data securely"
        placement="end"
        withArrow
        transition="pop-bottom-right"
      >
        <Text color="dimmed" sx={{ cursor: 'help' }}>
          <Center>
            <InfoCircle size={18} />
          </Center>
        </Text>
      </Tooltip>
    );
  
    return (
      <TextInput
        rightSection={rightSection}
        label="First Name"
        placeholder="First Name"
      />
    );
  }

  function TooltipLastName() {
    const rightSection = (
      <Tooltip
        label="We store your data securely"
        placement="end"
        withArrow
        transition="pop-bottom-right"
      >
        <Text color="dimmed" sx={{ cursor: 'help' }}>
          <Center>
            <InfoCircle size={18} />
          </Center>
        </Text>
      </Tooltip>
    );
  
    return (
      <TextInput
        rightSection={rightSection}
        label="Last Name"
        placeholder="Last Name"
      />
    );
  }

function TooltipEmail() {
  const rightSection = (
    <Tooltip
      label="We store your data securely"
      placement="end"
      withArrow
      transition="pop-bottom-right"
    >
      <Text color="dimmed" sx={{ cursor: 'help' }}>
        <Center>
          <InfoCircle size={18} />
        </Center>
      </Text>
    </Tooltip>
  );

  return (
    <TextInput
      rightSection={rightSection}
      label="Email"
      placeholder="Email"
    />
  );
}

function TooltipPassword() {
  const [opened, setOpened] = useState(false);
  const [value, setValue] = useState('');
  const valid = value.trim().length >= 6;
  return (
    <Tooltip
      label={valid ? 'All good!' : 'Password must include at least 6 characters'}
      position="bottom"
      placement="start"
      withArrow
      opened={opened}
      sx={{ display: 'block', width: '100%' }}
      color={valid ? 'teal' : 'gray'}
    >
      <PasswordInput
        label="Password"
        required
        placeholder="Password"
        onFocus={() => setOpened(true)}
        onBlur={() => setOpened(false)}
        mt="md"
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
      />
    </Tooltip>
  );
}

export default function CreateUser() {
  return (
    <Layout >
      <div>
        <TooltipFirstName />
        <TooltipLastName />
        <TooltipEmail />
        <TooltipPassword />
        <Button>Create Account</Button>
      </div>
    </Layout>
  );
}