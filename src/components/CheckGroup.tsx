import {
    CheckboxGroup,
    Checkbox,
    VStack,
    Divider,
    Heading
} from "@chakra-ui/react"
import UploadButton from "./UploadButton"

const CheckGroup = ({ names, props }: { names: string[]; props: any }) => {
    names.sort()
    return (
        <CheckboxGroup colorScheme="blue">
            <VStack
                maxH="calc(100vh - 8rem)"
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
                <Heading
                    as="h6"
                    alignSelf="center"
                    size="xs">{`${names.length} member(s)`}</Heading>
                <UploadButton />
            </VStack>
        </CheckboxGroup>
    )
}

export default CheckGroup
