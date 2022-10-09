import { CheckboxGroup, Checkbox, VStack } from "@chakra-ui/react"

const CheckGroup = ({ names, props }: { names: string[]; props: any }) => {
    return (
        <CheckboxGroup colorScheme="blue">
            <VStack
                maxH={{ base: "calc(50vh - 4rem)", md: "calc(50vh - 8rem)" }}
                align="self-start"
                overflowY="scroll"
                px={4}
                py={8}
                borderColor="gray"
                borderWidth={1}
                rounded="lg">
                {names.map((n) => (
                    <Checkbox key={n} {...props({ value: n })}>
                        {n}
                    </Checkbox>
                ))}
            </VStack>
        </CheckboxGroup>
    )
}

export default CheckGroup
