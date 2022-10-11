import {
    TableContainer,
    Table,
    TableCaption,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Tfoot
} from "@chakra-ui/react"
import type Slots from "vit-timetable-explorer/dist/src/types/slots"

const SlotTable = ({ slots }: { slots: Slots }) => {
    return (
        <TableContainer
            borderColor="gray"
            borderWidth={1}
            rounded="lg"
            py={4}
            minH={{ base: "inherit", lg: "80vh" }}>
            <Table
                variant="striped"
                colorScheme="gray"
                size={{ base: "", md: "md" }}>
                <TableCaption>
                    Slots shown for each day are between 8:00 hrs and 20:00 hrs
                </TableCaption>
                <Thead>
                    <Tr>
                        <Th>DAY</Th>
                        <Th>TIMINGS</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {Object.keys(slots).map((s) => {
                        return (
                            <Tr key={s}>
                                <Td fontWeight="semibold">{s}</Td>
                                <Td>{slots[s].join(", ")}</Td>
                            </Tr>
                        )
                    })}
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default SlotTable
