import { CheckboxGroup, Checkbox, VStack, Divider } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { Dispatch, SetStateAction } from "react"

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
                            setCheckedItems(names.map(() => e.target.checked))
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
        </CheckboxGroup>
    )
}

export default CheckGroup
