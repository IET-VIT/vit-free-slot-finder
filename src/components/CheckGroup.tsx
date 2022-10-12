import { CloseIcon } from "@chakra-ui/icons"
import {
    CheckboxGroup,
    Checkbox,
    VStack,
    Divider,
    Heading,
    ButtonGroup,
    Button,
    Spacer
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { Dispatch, SetStateAction } from "react"
import UploadButton from "./UploadButton"

const CheckGroup = ({
    names,
    checkedItems,
    setCheckedItems
}: {
    names: string[]
    checkedItems: boolean[]
    setCheckedItems: Dispatch<SetStateAction<boolean[]>>
}) => {
    const router = useRouter()
    names.sort()

    const allChecked = checkedItems.every(Boolean)
    const isIndeterminate = checkedItems.some(Boolean) && !allChecked

    return (
        <CheckboxGroup colorScheme="blue">
            <VStack h={{ base: "inherit", lg: "80vh" }} spacing={4}>
                <VStack px={4}>
                    <ButtonGroup
                        variant="solid"
                        alignSelf="center"
                        size={{ base: "sm", sm: "md" }}
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
                    {names.length > 0 && <Divider />}
                    <Heading as="h6" alignSelf="center" size="xs">{`${
                        names.length > 0
                            ? `${checkedItems.reduce(
                                  (previousValue, currentValue) =>
                                      currentValue
                                          ? previousValue + 1
                                          : previousValue,
                                  0
                              )} selected of `
                            : ``
                    }${names.length} member(s)`}</Heading>
                </VStack>
                {names.length > 0 && (
                    <VStack
                        align="self-start"
                        overflowY="scroll"
                        p={4}
                        borderColor="gray"
                        borderWidth={1}
                        rounded="lg"
                        w="100%"
                        maxH={{ base: "80vh", lg: "70vh" }}>
                        <Checkbox
                            isChecked={allChecked}
                            isIndeterminate={isIndeterminate}
                            onChange={(e) =>
                                setCheckedItems(
                                    names.map(() => e.target.checked)
                                )
                            }>
                            Select all
                        </Checkbox>
                        <Divider />
                        {names.map((n, i) => (
                            <Checkbox
                                key={n}
                                isChecked={checkedItems[i]}
                                onChange={(e) => {
                                    const newCheckedItems = [...checkedItems]
                                    newCheckedItems[i] = e.target.checked
                                    setCheckedItems(newCheckedItems)
                                }}>
                                {n}
                            </Checkbox>
                        ))}
                    </VStack>
                )}
            </VStack>
        </CheckboxGroup>
    )
}

export default CheckGroup
