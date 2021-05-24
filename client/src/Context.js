import { useState } from "react"
// https://github.com/jamiebuilds/unstated-next
import { createContainer } from "unstated-next"

const useTheme = () => {
    const [isDark, setIsDark] = useState(localStorage.getItem('ttgTheme') === "true")
    const toggleTheme = () => {
        setIsDark(!isDark)
        localStorage.setItem('ttgTheme', !isDark)
    }

    return {isDark, toggleTheme}
}

const useContext = () => {
    let themeContext = useTheme()
    return {themeContext}
}

const Context = createContainer(useContext)

export default Context