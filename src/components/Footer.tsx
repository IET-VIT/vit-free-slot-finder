import { Flex, Icon, Link, Spacer, Stack, Text } from "@chakra-ui/react"

const Footer = () => {
    return (
        <Stack
            direction={{ base: "column", md: "row" }}
            align="center"
            spacing={{ base: 2, md: 4 }}
            w="100%"
            px={8}
            fontSize="sm">
            <Text flexShrink={0} textAlign={{ base: "center", md: "end" }}>
                &copy; 2022{" "}
                <Link href="https://imarjun.me" textDecoration="underline">
                    Arjun Sivaraman
                </Link>{" "}
            </Text>
            <Spacer />
            <Text textAlign="center">
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
            <Spacer />
            <Flex gap={{ base: 2, md: 4 }} flexWrap="wrap">
                <Link
                    href="https://github.com/1407arjun/vit-free-slot-finder"
                    textDecoration="underline">
                    GitHub
                </Link>
                <Link
                    href="https://showcase.imarjun.me"
                    textDecoration="underline">
                    Showcase
                </Link>
            </Flex>
        </Stack>
    )
}

export default Footer
