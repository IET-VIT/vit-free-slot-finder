import { CheckboxGroup, Checkbox, VStack } from "@chakra-ui/react"

const CheckGroup = ({ names, props }: { names: string[]; props: any }) => {
    return (
        <VStack
            h={{ base: "calc(80vh - 4rem)", md: "calc(50vh - 8rem)" }}
            align="self-start">
            {names.map((n) => (
                <Checkbox key={n} {...props({ value: n })}>
                    {n}
                </Checkbox>
            ))}
        </VStack>
    )
}

export default CheckGroup
