import React from "react";
import { Button, Flex, Stack } from "@chakra-ui/react"
import { FaGithub, FaChrome, FaTwitter } from 'react-icons/fa'
import { Brand } from "./brand";

export function PageHeader() {
    return (
        <Flex justifyContent='space-between' alignItems='center' pt='15px'>
            <Brand />
            <Stack isInline>
                <Button leftIcon={<FaGithub />}>View Source</Button>
                <Button leftIcon={<FaChrome />} colorScheme='red'>Use Extension</Button>
                <Button leftIcon={<FaTwitter />} colorScheme='purple'>Tweet</Button>
            </Stack>
        </Flex>
    )
}