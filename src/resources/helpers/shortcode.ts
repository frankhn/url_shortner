export const shortCodeGenerator = (): string => {
    const year = `${new Date().getFullYear()}`.split('').slice(2, 4).join("")
    const month = `${new Date().getMonth()}`
    const day = `${new Date().getUTCDay()}`
    return `${year}${(Math.random()).toString(36).substring(8)}${day}${month}`
}
