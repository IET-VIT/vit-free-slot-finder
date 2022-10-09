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
            <VStack
                maxH="calc(100vh - 8rem)"
                align="self-start"
                overflowY="scroll"
                px={4}
                py={8}
                borderColor="gray"
                borderWidth={1}
                rounded="lg">
                {names.length > 0 && (
                    <Checkbox
                        isChecked={allChecked}
                        isIndeterminate={isIndeterminate}
                        onChange={(e) =>
                            setCheckedItems(names.map(() => e.target.checked))
                        }>
                        Select all
                    </Checkbox>
                )}
                {names.length > 0 && <Divider />}
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
