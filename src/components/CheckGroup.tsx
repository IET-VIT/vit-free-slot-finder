import { CloseIcon } from "@chakra-ui/icons"
import {
    CheckboxGroup,
    Checkbox,
    VStack,
    Divider,
    Heading,
    ButtonGroup,
    Button
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import UploadButton from "./UploadButton"

const CheckGroup = ({
    names,
    props,
    selected
}: {
    names: string[]
    props: any
    selected: number
}) => {
    const router = useRouter()
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
                <Heading as="h6" alignSelf="center" size="xs">{`${
                    names.length > 0 ? `${selected} selected of ` : ``
                }${names.length} member(s)`}</Heading>
                <ButtonGroup
                    variant="solid"
                    alignSelf="center"
                    size="md"
                    colorScheme="blue">
                    <UploadButton />
                    {names.length > 0 && (
                        <Button
                            alignSelf="center"
                            leftIcon={<CloseIcon />}
                            onClick={() => {
                                localStorage.removeItem("data")
                                router.reload()
                            }}>
                            Clear
                        </Button>
                    )}
                </ButtonGroup>
            </VStack>
        </CheckboxGroup>
    )
}

export default CheckGroup
