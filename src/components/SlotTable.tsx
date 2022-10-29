import {
    TableContainer,
    Table,
    TableCaption,
    Thead,
    Tr,
    Th,
    Tbody,
    Td
} from "@chakra-ui/react"
import type Slots from "vit-timetable-explorer/dist/src/types/slots"

const SlotTable = ({ slots }: { slots: Slots }) => {
    return (
        <TableContainer
            borderColor="gray"
            borderWidth={1}
            rounded="lg"
            py={4}
            overflowX="auto">
            <Table
                variant="striped"
                colorScheme="gray"
                size={{ base: "", md: "md" }}>
                <TableCaption px={4}>
                    Slots shown for each day are between 8:00 hrs and 20:00 hrs
                </TableCaption>
                <Thead>
                    <Tr>
                        <Th px={2}>DAY</Th>
                        <Th px={2}>TIMINGS</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {Object.keys(slots).map((s) => {
                        return (
                            <Tr key={s}>
                                <Td fontWeight="semibold" px={2}>
                                    {s}
                                </Td>
                                <Td px={2}>
                                    {slots[s]
                                        .map((s) => `${s.start} to ${s.end}`)
                                        .join(", ")}
                                </Td>
                            </Tr>
                        )
                    })}
                </Tbody>
            </Table>
        </TableContainer>
    )
}

export default SlotTable
