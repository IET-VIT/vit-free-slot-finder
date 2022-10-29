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
            borderWidth={1}
            borderColor="gray"
            p={2}
            minW={{ base: 20, lg: 16 }}
            textAlign="center"
            color="#5d6062"
            fontSize="xs"
            {...props}>
            {props.children}
        </GridItem>
    )
}

const Timetable = ({
    freeSlots,
    weekend
}: {
    freeSlots: Slots
    weekend: boolean
}) => {
    const matrix = getSlotPositions(freeSlots)
    const daysToShow = weekend ? days : days.slice(0, 5)

    return (
        <Grid w="100%" overflow="auto" templateColumns="repeat(16, 1fr)">
            <Slot
                rowSpan={2}
                roundedTopLeft="lg"
                fontWeight="bold"
                bgColor="#e1e2e2">
                THEORY
            </Slot>
            <Slot fontWeight="bold" bgColor="#e1e2e2">
                Start
            </Slot>
            {startTheory.map((t, i) => (
                <Slot
                    key={t === "-" ? `-${i}` : t}
                    {...(i === startLab.length - 1 && {
                        roundedTopRight: "lg"
                    })}
                    fontWeight="semibold"
                    bgColor="#ccccff">
                    {t}
                </Slot>
            ))}
            <Slot fontWeight="bold" bgColor="#e1e2e2">
                End
            </Slot>
            {endTheory.map((t, i) => (
                <Slot
                    key={t === "-" ? `-${i}` : t}
                    fontWeight="semibold"
                    bgColor="#ccccff">
                    {t}
                </Slot>
            ))}
            <Slot rowSpan={2} fontWeight="bold" bgColor="#e1e2e2">
                LAB
            </Slot>
            <Slot fontWeight="bold" bgColor="#e1e2e2">
                Start
            </Slot>
            {startLab.map((t, i) => (
                <Slot
                    key={t === "-" ? `-${i}` : t}
                    fontWeight="semibold"
                    bgColor="#9acbff">
                    {t}
                </Slot>
            ))}
            <Slot fontWeight="bold" bgColor="#e1e2e2">
                End
            </Slot>
            {endLab.map((t, i) => (
                <Slot
                    key={t === "-" ? `-${i}` : t}
                    fontWeight="semibold"
                    bgColor="#9acbff">
                    {t}
                </Slot>
            ))}
            {daysToShow.map((d, i) => {
                return (
                    <>
                        <Slot
                            key={d}
                            rowSpan={2}
                            {...(i === daysToShow.length - 1 && {
                                roundedBottomLeft: "lg"
                            })}
                            fontWeight="bold"
                            bgColor="#e1e2e2">
                            {d}
                        </Slot>
                        <Slot fontWeight="bold" bgColor="#e1e2e2">
                            THEORY
                        </Slot>
                        {slots[i][0].map((t, j) => (
                            <Slot
                                key={t === "-" ? `-${j}` : t}
                                bgColor={
                                    t.trim() !== "Lunch" ? "#ffffcc" : "#e1e2e2"
                                }
                                fontWeight={
                                    t.trim() !== "Lunch" ? "normal" : "semibold"
                                }
                                {...(t.trim() !== "Lunch" &&
                                    matrix[i][j][0] === 1 && {
                                        bgColor: "#ccff32",
                                        fontWeight: "semibold"
                                    })}>
                                {t}
                            </Slot>
                        ))}
                        <Slot fontWeight="bold" bgColor="#e1e2e2">
                            LAB
                        </Slot>
                        {slots[i][1].map((t, j) => (
                            <Slot
                                key={t === "-" ? `-${j}` : t}
                                bgColor={
                                    t.trim() !== "Lunch" ? "#f9efa4" : "#e1e2e2"
                                }
                                fontWeight={
                                    t.trim() !== "Lunch" ? "normal" : "semibold"
                                }
                                {...(t.trim() !== "Lunch" &&
                                    matrix[i][j][1] === 1 && {
                                        bgColor: "#ccff32",
                                        fontWeight: "semibold"
                                    })}
                                {...(i === daysToShow.length - 1 &&
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
