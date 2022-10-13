import { AddIcon, ChevronDownIcon } from "@chakra-ui/icons"
import { Button, Heading, HStack, Spacer } from "@chakra-ui/react"
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider
} from "@chakra-ui/react"
import ColorToggle from "./ColorToggle"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import DeleteButton from "./DeleteButton"

const Navbar = ({ profile }: { profile?: string }) => {
    const router = useRouter()
    const [profiles, setProfiles] = useState<string[]>([])
    const prefix = "slot-finder-profile-"

    useEffect(() => {
        const data = Object.keys(localStorage).filter(
            (k) => k.startsWith(prefix) && k.substring(prefix.length).length > 0
        )
        setProfiles(data)
    }, [])

    return (
        <HStack justifyContent="center" alignItems="center" w="100%" px={4}>
            <Heading as="h1" size="lg" textAlign="start">
                VIT Free Slot Finder
            </Heading>
            <Spacer />
            <Menu>
                <MenuButton
                    as={Button}
                    colorScheme="blue"
                    rightIcon={<ChevronDownIcon />}>
                    Profiles
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={() => router.push(`/`)}>
                        Default
                    </MenuItem>
                    {profiles.length > 0 && <MenuDivider />}
                    {profiles.map((p) => (
                        <MenuItem key={p} onClick={() => router.push(`/${p}`)}>
                            {p}
                        </MenuItem>
                    ))}
                    <MenuDivider />
                    <MenuItem>
                        <AddIcon />
                        &nbsp;Add profile
                    </MenuItem>
                </MenuList>
            </Menu>
            {profile && <DeleteButton />}
            <ColorToggle />
        </HStack>
    )
}

export default Navbar
