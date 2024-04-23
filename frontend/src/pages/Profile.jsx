import React, { useEffect, useState } from 'react';
import { axios_api } from '../axios';
import LoadingSpinner from '../components/LoadingSpinner';
import {
    Card,
    Group,
    Text,
    Badge,
    Button,
    Avatar,
    Modal,
    Title,
    PasswordInput,
    Stack,
    LoadingOverlay,
    Loader
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';


export default function Profile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [prevPassword, setPrevPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [changingPassword, setChangingPassword] = useState(false);
    const [opened, { open, close }] = useDisclosure(false);

    async function getUser() {
        const resp = await axios_api.get('/auth/user');
        setUser(resp.data);
        setLoading(false);
    }

    useEffect(() => {
        getUser();
    }, []);

    async function handleSignOut() {
        await axios_api.get('/auth/logout').then(res => {
            window.sessionStorage.setItem("logged_in", "false");
            window.location.href = "/login";
        });
    }

    async function handleChangePassword() {
        await axios_api.post('/auth/change_password', {
            data: {
                new_password: newPassword,
                prev_password: prevPassword
            }
        }).then(res => {
            close();
        });
    }

    function validatePassword(password) {
        // Check length
        if (password.length < 6 || password.length > 30) {
            return false;
        }

        // Check for at least one uppercase letter
        if (!/[A-Z]/.test(password)) {
            return false;
        }

        // Check for at least one number
        if (!/\d/.test(password)) {
            return false;
        }

        // All conditions passed
        return true;
    }

    return (
        <>
            {loading ? <LoadingSpinner /> :
                <>
                    <Title fz={26} c="#222" fw={500}>Profile</Title>
                    <Card
                        shadow="sm"
                        padding="sm"
                        radius="md"
                        w={360}
                        pb={18}
                        mt={24}
                        withBorder
                    >
                        <Group mb="xs" justify='space-between'>
                            <Group>
                                <Avatar />
                                <Text fw={500}>{user.full_name}</Text>
                            </Group>
                            <Badge color="cyan">Batch {user.batch}</Badge>
                        </Group>
                        <Group mt={14} justify='space-between'>
                            <Text size="sm" c="dimmed">
                                {user.course}
                            </Text>
                            <Text size="sm" c="dimmed">
                                {user.year} year
                            </Text>
                        </Group>
                        <Text mt={12}>{user.email}</Text>
                        <Button variant='outline' size='compact-xs' my={14} w="fit-content" onClick={open}>Change password</Button>
                        <Button color="red" variant='light' mt={28} size='compact-lg' onClick={handleSignOut}>Sign Out</Button>
                    </Card>
                    <Modal opened={opened} onClose={close} title="Change password">
                        <LoadingOverlay visible={changingPassword} loaderProps={{ children: <Loader /> }} />

                        <Stack gap={14}>
                            <PasswordInput
                                value={prevPassword}
                                onChange={(e) => setPrevPassword(e.currentTarget.value)}
                                label="Previous password" />
                            <PasswordInput
                                value={newPassword}
                                error={!validatePassword(newPassword) ? 'Min: 6 characters, Max: 30, At least one uppercase and number required!' : null}
                                onChange={(e) => setNewPassword(e.currentTarget.value)}
                                label="New password" />
                            <PasswordInput
                                value={confirmPassword}
                                error={confirmPassword !== newPassword ? 'Passwords do not match!' : null}
                                onChange={(e) => setconfirmPassword(e.currentTarget.value)}
                                label="Confirm password" />
                            <Button
                                onClick={handleChangePassword}
                                variant='light'
                                disabled={
                                    (confirmPassword !== newPassword) ||
                                    !validatePassword(newPassword) ||
                                    (prevPassword === '')
                                }
                                mt={10}
                                w="fit-content">
                                Apply changes
                            </Button>
                        </Stack>
                    </Modal>
                </>
            }
        </>
    );
}
