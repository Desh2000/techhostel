import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import {
    AppShell,
    Burger,
    Title,
    Stack,
    Button,
    Group,
    ActionIcon
} from '@mantine/core';
import { IconCup, IconHome, IconKey, IconMessage2, IconMessage2Check, IconRibbonHealth, IconUserCircle, IconWallet } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';

const navLinkStyles = {
    width: "100%",
    backgroundColor: "#228be612",
    borderRadius: "6px"
}

export default function MainLayout() {
    const [opened, { toggle }] = useDisclosure();
    const logged_in = window.sessionStorage.getItem("logged_in") === "true";
    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{
                width: 200,
                breakpoint: 'sm',
                collapsed: { mobile: !opened },
            }}
            p="md"
        >
            <AppShell.Header>
                <Group
                    hiddenFrom='sm'
                    align='center'
                    px={12}
                    h="100%">
                    <Burger
                        opened={opened}
                        onClick={toggle}
                        hiddenFrom="sm"
                        size="sm"
                    />
                    <Title fz={24} c="#222">Tech Hostel</Title>
                </Group>
                <Group
                    h="100%"
                    justify='space-between'
                    px={12}
                    visibleFrom='sm'
                    align='center'>
                    <Title fz={24} c="#222">Tech Hostel</Title>
                    {!logged_in ?
                        <Link to="/login">
                            <Button w="100%" variant="subtle">Login</Button>
                        </Link> :
                        <Link to="/profile">
                            <ActionIcon w="100%" variant="light" size="lg">
                                <IconUserCircle size={22} />
                            </ActionIcon>
                        </Link>
                    }
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p="sm">
                <Stack
                    gap="lg"
                    mt={12}
                >
                    <Link style={navLinkStyles} to="/">
                        <Button leftSection={<IconHome size={16} />} w="100%" variant="subtle">Home</Button>
                    </Link>
                    <Link style={navLinkStyles} to="/gate-passes">
                        <Button leftSection={<IconKey size={16} />} w="100%" variant="subtle">Gate Passes</Button>
                    </Link>
                    <Link style={navLinkStyles} to="/feedback">
                        <Button leftSection={<IconMessage2Check size={16} />} w="100%" variant="subtle">Feedback</Button>
                    </Link>
                    <Link style={navLinkStyles} to="/medical-profile">
                        <Button leftSection={<IconRibbonHealth size={16} />} w="100%" variant="subtle">Medical Profile</Button>
                    </Link>
                    <Link style={navLinkStyles} to="/food-order">
                        <Button leftSection={<IconCup size={16} />} style={{ background: "#ec407a" }} w="100%" color={"#ec407a"} bg={"#ec407a26"} variant="subtle">Food Order</Button>
                    </Link>
                    <Link style={navLinkStyles} to="/e-wallet">
                        <Button leftSection={<IconWallet size={16} />} style={{ background: "#ff9800" }} w="100%" color={"#ff9800"} bg={"#ffac332e"} variant="subtle">E-Wallet</Button>
                    </Link>
                </Stack>
            </AppShell.Navbar>
            <AppShell.Main>
                <Outlet />
            </AppShell.Main>
        </AppShell>
    )
}
