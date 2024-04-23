import { Alert, Text } from '@mantine/core'
import React from 'react'

export default function Error() {
    return (
        <Alert color='red'>
            <Text>Sorry! An error has been occured. Please contact administrator.</Text>
        </Alert>
    )
}
