import { InfoIcon } from "@chakra-ui/icons"
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverHeader,
    PopoverBody
} from "@chakra-ui/react"
import { ListItem, IconButton, UnorderedList, Text } from "@chakra-ui/react"

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
                    <UnorderedList mb={4}>
                        <ListItem fontWeight="semibold">Name</ListItem>
                        <ListItem fontWeight="semibold">Timetable</ListItem>
                    </UnorderedList>
                    For the timetable entries follow the steps below:
                    <UnorderedList>
                        <ListItem>
                            Go to your timetable on VTOP. Scroll down to see the
                            table with your schedule
                        </ListItem>
                        <ListItem>
                            Select the text from{" "}
                            <Text fontWeight="semibold" display="inline">
                                THEORY
                            </Text>{" "}
                            in the top left to{" "}
                            <Text fontWeight="semibold" display="inline">
                                L94 -
                            </Text>{" "}
                            in the bottom right
                        </ListItem>
                        <ListItem>Copy-paste all of the selected text</ListItem>
                    </UnorderedList>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

export default InfoPopover
