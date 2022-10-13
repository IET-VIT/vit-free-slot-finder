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

const Navbar = () => {
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
                    <MenuItem>Default</MenuItem>
                    <MenuDivider />
                    <MenuItem>Create a Copy</MenuItem>
                    <MenuItem>Mark as Draft</MenuItem>
                    <MenuItem>Delete</MenuItem>
                    <MenuDivider />
                    <MenuItem>
                        <AddIcon />
                        &nbsp;Add profile
                    </MenuItem>
                </MenuList>
            </Menu>
            <ColorToggle />
        </HStack>
    )
}

export default Navbar
