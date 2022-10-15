import { Grid, GridItem, GridItemProps, Text } from "@chakra-ui/react"
import type Slots from "vit-timetable-explorer/dist/src/types/slots"
import getSlotPositions from "../utils/getSlotPositions"
import {
    startTheory,
    startLab,
    endTheory,
    endLab,
    slots,
    days
} from "../utils/timetableFormat"

const Slot = (props: GridItemProps) => {
    return (
        <GridItem
            {...props}
            borderWidth={1}
            borderColor="gray"
            p={2}
            minW={16}
            textAlign="center"
            fontSize="sm">
            {props.children}
        </GridItem>
    )
}

const Timetable = ({ freeSlots }: { freeSlots: Slots }) => {
    const matrix = getSlotPositions(freeSlots)
    return (
        <Grid
            w="100%"
            overflow="auto"
            templateColumns="repeat(16, 1fr)"
            rounded="lg"
            borderWidth={1}
            borderColor="gray">
            <Slot rowSpan={2} roundedTopLeft="lg">
                Theory
            </Slot>
            <Slot>Start</Slot>
            {startTheory.map((t, i) => (
                <Slot
                    key={t === "-" ? `-${i}` : t}
                    {...(i === startLab.length - 1 && {
                        roundedTopRight: "lg"
                    })}>
                    {t}
                </Slot>
            ))}
            <Slot>End</Slot>
            {endTheory.map((t, i) => (
                <Slot key={t === "-" ? `-${i}` : t}>{t}</Slot>
            ))}
            <Slot rowSpan={2}>Lab</Slot>
            <Slot>Start</Slot>
            {startLab.map((t, i) => (
                <Slot key={t === "-" ? `-${i}` : t}>{t}</Slot>
            ))}
            <Slot>End</Slot>
            {endLab.map((t, i) => (
                <Slot key={t === "-" ? `-${i}` : t}>{t}</Slot>
            ))}
            {days.map((d, i) => {
                return (
                    <>
                        <Slot
                            key={d}
                            rowSpan={2}
                            {...(i === days.length - 1 && {
                                roundedBottomLeft: "lg"
                            })}>
                            {d}
                        </Slot>
                        <Slot>Theory</Slot>
                        {slots[i][0].map((t, j) => (
                            <Slot
                                key={t === "-" ? `-${j}` : t}
                                {...(matrix[i][j][0] === 1 && {
                                    bgColor: "green"
                                })}>
                                {t}
                            </Slot>
                        ))}
                        <Slot>Lab</Slot>
                        {slots[i][1].map((t, j) => (
                            <Slot
                                key={t === "-" ? `-${j}` : t}
                                {...(matrix[i][j][1] === 1 && {
                                    bgColor: "green"
                                })}
                                {...(i === days.length - 1 &&
                                    j === slots[i][1].length - 1 && {
                                        roundedBottomRight: "lg"
                                    })}>
                                {t}
                            </Slot>
                        ))}
                    </>
                )
            })}
        </Grid>
    )
}

export default Timetable
