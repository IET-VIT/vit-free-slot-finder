import { SunIcon } from "@chakra-ui/icons"
import { Tooltip, useColorMode, useColorModeValue } from "@chakra-ui/react"
import { IconButton } from "@chakra-ui/react"

const ColorToggle = () => {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <Tooltip
            label={`Toggle ${colorMode === "light" ? "Dark" : "Light"} mode`}>
            <IconButton
                onClick={toggleColorMode}
                icon={<SunIcon />}
                fontSize="xl"
                aria-label="Theme switcher"
                size="lg"
                color={`${colorMode}.accent`}
                variant="ghost"
            />
        </Tooltip>
    )
}

export default ColorToggle
