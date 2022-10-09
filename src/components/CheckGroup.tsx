import { CheckboxGroup, Checkbox, VStack } from "@chakra-ui/react"

const CheckGroup = ({ names }: { names: string[] }) => {
    return (
        <CheckboxGroup colorScheme="green">
            <VStack>
                {names.map((n) => (
                    <Checkbox key={n} value={n}>
                        {n}
                    </Checkbox>
                ))}
            </VStack>
        </CheckboxGroup>
    )
}

export default CheckGroup
