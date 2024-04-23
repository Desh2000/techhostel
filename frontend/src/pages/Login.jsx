import React, { useEffect, useState } from 'react';
import {
  Fieldset,
  TextInput,
  Button,
  Center,
  Stack,
  Notification,
  Dialog,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [opened, { toggle, close }] = useDisclosure(false);
  const [notif, setNotif] = useState('');
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    await axios.post('http://localhost:5000/api/auth/login', {
      email,
      password
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async (res) => {
      // Log user
      window.sessionStorage.setItem("logged_in", "true");
      window.location.href = "/";
    }).catch(error => {
      toggle();
      setLoading(false);
      setNotif(error.message);
    });
  };

  useEffect(() => {
    if (window.sessionStorage.getItem("logged_in") === "true") {
      window.location.href = "/";
    } else {
      setChecking(false);
    }
  }, []);

  return (
    <>
      {!checking ?
        <>
          <Center>
            <Fieldset
              style={{
                width: '360px',
                marginTop: '120px',
              }}
            >
              <Title style={{ textAlign: "center" }} order={3}>Sign In</Title>
              <Stack
                gap={16}
                style={{ marginTop: '12px' }}
              >
                <TextInput
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  label="Email"
                  required
                  type="email"
                  placeholder="Email"
                />
                <TextInput
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  label="Password"
                  required
                  type="password"
                  placeholder="Password"
                />
                <Button
                  variant="filled"
                  size="xs"
                  loading={loading}
                  onClick={handleSubmit}
                >
                  Continue
                </Button>
              </Stack>
            </Fieldset>
          </Center>
          <Dialog
            opened={opened}
            onClose={close}
            withBorder
            withCloseButton
          >
            <Notification color="red" title="Authentication Error!">
              {notif}
            </Notification>
          </Dialog></> :
        <>
          <LoadingSpinner />
        </>
      }
    </>
  );
}
