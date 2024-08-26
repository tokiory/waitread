import { getTheme, toggleTheme as toggleAppTheme } from "@/lib/theme"
import { Button } from "./ui/button"

export const ThemeSwitcher = () => {
  const toggleTheme = () => {
    const currentTheme = getTheme()
    toggleAppTheme(currentTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Button onClick={toggleTheme} variant="ghost">Switch theme</Button>
  )
}
