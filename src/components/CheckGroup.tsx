import { CheckboxGroup, Checkbox, VStack, Divider } from "@chakra-ui/react"
import UploadButton from "./UploadButton"

const CheckGroup = ({ names, props }: { names: string[]; props: any }) => {
    names.sort()
    return (
        <CheckboxGroup colorScheme="blue">
            <VStack
                maxH={{ base: "calc(50vh - 8rem)", lg: "calc(100vh - 12rem)" }}
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
                <Divider />
                <UploadButton />
            </VStack>
        </CheckboxGroup>
    )
}

export default CheckGroup
