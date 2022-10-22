import { AddIcon, ChevronDownIcon } from "@chakra-ui/icons"
import {
    Button,
    Heading,
    HStack,
    Spacer,
    useDisclosure
} from "@chakra-ui/react"
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider
} from "@chakra-ui/react"
import ColorToggle from "./ColorToggle"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/router"
import DeleteButton from "./DeleteButton"
import AddProfile from "./AddProfile"

const Navbar = ({ profile }: { profile?: string }) => {
    const router = useRouter()
    const [profiles, setProfiles] = useState<string[]>([])
    const prefix = "slot-finder-profile-"

    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()

    useEffect(() => {
        const data = Object.keys(localStorage).filter(
            (k) => k.startsWith(prefix) && k.substring(prefix.length).length > 0
        )
        setProfiles(data)
    }, [])

    return (
        <HStack justifyContent="center" alignItems="center" w="100%" px={4}>
            <Heading as="h1" size={{ base: "md", lg: "lg" }} textAlign="start">
                VIT Free Slot Finder
            </Heading>
            <Spacer />
            <Menu>
                <MenuButton
                    as={Button}
                    colorScheme="blue"
                    rightIcon={<ChevronDownIcon />}
                    size={{ base: "sm", sm: "md" }}>
                    {profile ? profile : "Default"}
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={() => router.push(`/`)}>
                        Default
                    </MenuItem>
                    {profiles.length > 0 && <MenuDivider />}
                    {profiles.map((p) => {
                        const str = p.substring(prefix.length)
                        return (
                            <MenuItem
                                key={p}
                                onClick={() => router.push(`/${str}`)}>
                                {str}
                            </MenuItem>
                        )
                    })}
                    <MenuDivider />
                    <MenuItem onClick={onOpen}>
                        <AddIcon />
                        &nbsp;Add profile
                    </MenuItem>
                    <AddProfile
                        isOpen={isOpen}
                        //@ts-ignore
                        leastDestructiveRef={cancelRef}
                        onClose={onClose}
                    />
                </MenuList>
            </Menu>
            {profile && <DeleteButton profile={profile} />}
            <ColorToggle />
        </HStack>
    )
}

export default Navbar
