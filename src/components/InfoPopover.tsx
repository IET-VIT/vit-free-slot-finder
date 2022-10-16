import { InfoIcon } from "@chakra-ui/icons"
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody,
    ListItem
} from "@chakra-ui/react"
import { IconButton, UnorderedList } from "@chakra-ui/react"

const InfoPopover = () => {
    return (
        <Popover>
            <PopoverTrigger>
                <IconButton
                    icon={<InfoIcon />}
                    fontSize="xl"
                    aria-label="Formatting Guidelines"
                />
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader fontWeight="bold">
                    Formatting for CSV files
                </PopoverHeader>
                <PopoverBody>
                    The CSV file should contain at least the following columns:
                    <UnorderedList>
                        <ListItem fontWeight="semibold">Name</ListItem>
                        <ListItem fontWeight="semibold">Timetable</ListItem>
                    </UnorderedList>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

export default InfoPopover
