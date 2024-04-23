import { Group, Loader } from '@mantine/core';
import React from 'react';

export default function LoadingSpinner() {
    return (
        <Group h={360} justify='center' align='center'>
            <Loader color="blue" size="sm" />
        </Group>
    )
}
