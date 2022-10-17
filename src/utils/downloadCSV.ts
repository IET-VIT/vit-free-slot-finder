const downloadCSV = (content: string) => {
    const blob = new Blob([content], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.setAttribute("href", url)
    a.setAttribute("download", "updated.csv")
    a.click()
}

export default downloadCSV
