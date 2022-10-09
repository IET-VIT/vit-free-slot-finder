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
        <TableContainer borderColor="gray" borderWidth={1} rounded="lg" py={4}>
            <Table variant="striped" colorScheme="gray">
                <TableCaption>Free Slots</TableCaption>
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
                                <Td>{s}</Td>
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
