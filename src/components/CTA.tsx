import {
    VStack,
    ButtonGroup,
    Button,
    Heading,
    Divider,
    useDisclosure,
    IconButton
} from "@chakra-ui/react"
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider
} from "@chakra-ui/react"
import UploadButton from "./UploadButton"
import {
    AddIcon,
    ChevronDownIcon,
    CloseIcon,
    DownloadIcon
} from "@chakra-ui/icons"
import { useRouter } from "next/router"
import InfoPopover from "./InfoPopover"
import AddMannual from "./AddMannual"
import { useRef } from "react"
import downloadCSV from "../utils/downloadCSV"

const CTA = ({
    names,
    checkedItems,
    profile
}: {
    names: string[]
    checkedItems: boolean[]
    profile?: string
}) => {
    const router = useRouter()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()
    const prefix = "slot-finder-profile-"

    return (
        <VStack px={4}>
            <ButtonGroup
                variant="solid"
                alignSelf="center"
                size={{ base: "sm", sm: "md" }}
                colorScheme="blue">
                <UploadButton profile={profile} />
                <InfoPopover />
                <Menu>
                    <MenuButton
                        as={IconButton}
                        colorScheme="blue"
                        icon={<ChevronDownIcon />}
                        aria-label="Options"
                    />
                    <MenuList>
                        <MenuItem onClick={onOpen}>
                            <AddIcon />
                            &nbsp;Add
                        </MenuItem>
                        {names.length > 0 && (
                            <MenuItem
                                onClick={() => {
                                    localStorage.removeItem(
                                        `${prefix}${profile ? profile : ""}`
                                    )
                                    router.reload()
                                }}>
                                <CloseIcon />
                                &nbsp;Clear
                            </MenuItem>
                        )}
                        {names.length > 0 && (
                            <MenuItem
                                onClick={() => {
                                    const content = localStorage.getItem(
                                        `${prefix}${profile ? profile : ""}`
                                    )
                                    if (content) downloadCSV(content)
                                }}>
                                <DownloadIcon />
                                &nbsp;Download
                            </MenuItem>
                        )}
                    </MenuList>
                </Menu>
            </ButtonGroup>
            <AddMannual
                profile={profile}
                isOpen={isOpen}
                //@ts-ignore
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            />
            {names.length > 0 && <Divider />}
            <Heading as="h6" alignSelf="center" size="xs">{`${
                names.length > 0
                    ? `${checkedItems.reduce(
                          (previousValue, currentValue) =>
                              currentValue ? previousValue + 1 : previousValue,
                          0
                      )} selected of `
                    : ``
            }${names.length} member(s)`}</Heading>
        </VStack>
    )
}

export default CTA
