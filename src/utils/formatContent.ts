const formatContent = (content: string) => {
    const data = content.split("\n\n")
    const formattedContent: { [key: string]: string } = {}

    for (var i = 0; i < data.length; i += 2) {
        formattedContent[data[i].trim()] = data[i + 1].trim()
    }

    return formattedContent
}

export default formatContent
