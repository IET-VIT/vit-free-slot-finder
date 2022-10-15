import { Grid, GridItem, GridItemProps, Text } from "@chakra-ui/react"

const Slot = (props: GridItemProps) => {
    return (
        <GridItem
            {...props}
            borderWidth={1}
            borderColor="gray"
            p={2}
            textAlign="center">
            {props.children}
        </GridItem>
    )
}

const startTheory =
    "08:00	09:00	10:00	11:00	12:00	-	Lunch	14:00	15:00	16:00	17:00	18:00	18:51	19:01".split(
        "\t"
    )
const endTheory =
    "08:50	09:50	10:50	11:50	12:50	-	Lunch	14:50	15:50	16:50	17:50	18:50	19:00	19:50".split(
        "\t"
    )
const startLab =
    "08:00	08:51	09:51	10:41	11:40	12:31	Lunch	14:00	14:51	15:51	16:41	17:40	18:31	-".split(
        "\t"
    )
const endLab =
    "08:50	09:40	10:40	11:30	12:30	13:20	Lunch	14:50	15:40	16:40	17:30	18:30	19:20	-".split(
        "\t"
    )
const t1 = "A1	F1	D1	TB1 \tTG1	-	Lunch	A2	F2	D2	TB2	TG2	-	V3".split("\t")
const l1 = "L1	L2	L3	L4	L5	L6	Lunch	L31	L32	L33	L34	L35	L36	-".split("\t")
const t2 = "B1	G1	E1	TC1	TAA1	-	Lunch	B2	G2	E2	TC2	TAA2	-	V4".split("\t")
const l2 = "L7	L8	L9	L10	L11	L12	Lunch	L37	L38	L39	L40	L41	L42	-".split("\t")
const t3 = "C1	A1	F1	V1	V2	-	Lunch	C2	A2	F2	TD2	TBB2	-	V5".split("\t")
const l3 = "L13	L14	L15	L16	L17	L18	Lunch	L43	L44	L45	L46	L47	L48	-".split("\t")
const t4 = "D1	B1	G1	TE1	TCC1	-	Lunch	D2	B2	G2	TE2	TCC2	-	V6".split("\t")
const l4 = "L19	L20	L21	L22	L23	L24	Lunch	L49	L50	L51	L52	L53	L54	-".split("\t")
const t5 = "E1	C1L	TA1	TF1	TD1	-	Lunch	E2	C2	TA2	TF2	TDD2	-	V7".split("\t")
const l5 = "L25	L26	L27	L28	L29	L30	Lunch	L55	L56	L57	L58	L59	L60	-".split("\t")
const t6 = "V8	X11	X12	Y11	Y12	-	Lunch	X21	Z21	Y21	W21	W22	-	V9".split("\t")
const l6 = "L71	L72	L73	L74	L75	L76	Lunch	L77	L78	L79	L80	L81	L82	-".split("\t")
const t7 = "V10	Y11	Y12	X11	X12	-	Lunch	Y21	Z21	X21	W21	W22	-	V11".split("\t")
const l7 = "L83	L84	L85	L86	L87	L88	Lunch	L89	L90	L91	L92	L93	L94	-".split("\t")

const slots = [
    [t1, l1],
    [t2, l2],
    [t3, l3],
    [t4, l4],
    [t5, l5],
    [t6, l6],
    [t7, l7]
]

const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]

const Timetable = () => {
    return (
        <Grid
            templateColumns="repeat(16, 1fr)"
            w="100%"
            rounded="lg"
            borderWidth={1}
            borderColor="gray">
            <Slot rowSpan={2} roundedTopLeft="lg">
                Theory
            </Slot>
            <Slot>Start</Slot>
            {startTheory.map((t) => (
                <Slot key={t}>{t}</Slot>
            ))}
            <Slot>End</Slot>
            {endTheory.map((t) => (
                <Slot key={t}>{t}</Slot>
            ))}
            <Slot rowSpan={2}>Lab</Slot>
            <Slot>Start</Slot>
            {startLab.map((t) => (
                <Slot key={t}>{t}</Slot>
            ))}
            <Slot>End</Slot>
            {endLab.map((t) => (
                <Slot key={t}>{t}</Slot>
            ))}
            {days.map((d, i) => {
                return (
                    <>
                        <Slot key={d} rowSpan={2}>
                            {d}
                        </Slot>
                        <Slot>Theory</Slot>
                        {slots[i][0].map((t) => (
                            <Slot key={t}>{t}</Slot>
                        ))}
                        <Slot>Lab</Slot>
                        {slots[i][1].map((t) => (
                            <Slot key={t}>{t}</Slot>
                        ))}
                    </>
                )
            })}
        </Grid>
    )
}

export default Timetable
