import type Slots from "vit-timetable-explorer/dist/src/types/slots"
import {
    startTheory,
    startLab,
    endTheory,
    endLab,
    slots,
    days
} from "./timetableFormat"

const getSlotPositions = (freeSlots: Slots) => {
    const matrix: number[][][] = [
        [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ],
        [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ],
        [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ],
        [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ],
        [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ],
        [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ],
        [
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0],
            [0, 0]
        ]
    ]

    for (const k of Object.keys(freeSlots)) {
        const index = days.indexOf(k)
        for (const s of freeSlots[k]) {
            let i,
                start = 0,
                end = 0,
                stt = 0,
                stl = 0,
                ent = 0,
                enl = 0
            if ((i = startTheory.indexOf(s.start)) !== -1) {
                start = i
                stt = 1
            } else if ((i = endTheory.indexOf(s.start)) !== -1) {
                start = i + 1
                stt = 1
            }

            if ((i = startLab.indexOf(s.start)) !== -1) {
                start = i
                stl = 1
            } else if ((i = endLab.indexOf(s.start)) !== -1) {
                start = i + 1
                stl = 1
            }

            if ((i = startTheory.indexOf(s.end)) !== -1) {
                end = i - 1
                ent = 1
            } else if ((i = endTheory.indexOf(s.end)) !== -1) {
                end = i
                ent = 1
            }

            if ((i = startLab.indexOf(s.end)) !== -1) {
                end = i - 1
                enl = 1
            } else if ((i = endLab.indexOf(s.end)) !== -1) {
                end = i
                enl = 1
            }

            if (stt !== 0) matrix[index][start][0] = 1
            if (stl !== 0) matrix[index][start][1] = 1
            if (ent !== 0) matrix[index][end][0] = 1
            if (enl !== 0) matrix[index][end][1] = 1

            for (i = start + 1; i < end; i++) {
                matrix[index][i][0] = 1
                matrix[index][i][1] = 1
            }
        }
    }

    return matrix
}

export default getSlotPositions
