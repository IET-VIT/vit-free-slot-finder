const formatContent = (content: string, csv = true) => {
    if (content.length === 0) return {}

    const formattedContent: { [key: string]: string } = {}

    if (csv) {
        const data = content.split("\r").map((s) => s.split(","))
        const indexOfName = data[0]
            .map((s) => s.toLowerCase().trim())
            .indexOf("name")
        const indexofTimetable = data[0]
            .map((s) => s.toLowerCase().trim())
            .indexOf("timetable")

        if (indexOfName === -1 || indexofTimetable === -1)
            throw "Invalid formatting"
        else {
            for (var i = 1; i < data.length; i++) {
                formattedContent[data[i][indexOfName].trim()] =
                    data[i][indexofTimetable].trim()
            }
        }
    } else {
        const data = content.split("\n\n")

        for (var i = 0; i < data.length; i += 2) {
            formattedContent[data[i].trim()] = data[i + 1].trim()
        }
    }

    return formattedContent
}

export default formatContent
