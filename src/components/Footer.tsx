import { Flex, Link, Stack, Text } from "@chakra-ui/react"

const Footer = () => {
    return (
        <Stack>
            <Flex
                pt={3}
                flexWrap="wrap"
                flexDirection="row"
                gap={1}
                justify="center"
                fontSize="sm">
                <Text>
                    &copy; 2022{" "}
                    <Link href="https://imarjun.me" textDecoration="underline">
                        Arjun Sivaraman
                    </Link>{" "}
                </Text>
                <Text>
                    Powered by{" "}
                    <Link
                        href="https://nextjs.org"
                        textDecoration="underline"
                        target="_blank">
                        Next.js
                    </Link>{" "}
                    and{" "}
                    <Link
                        href="https://chakra-ui.com"
                        textDecoration="underline"
                        target="_blank">
                        Chakra UI
                    </Link>
                </Text>
            </Flex>
        </Stack>
    )
}

export default Footer
