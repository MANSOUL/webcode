import React from 'react'
import { ThemeProviderProps } from './interface'
import themeContext from './context'

export default function ThemeProvider({
  children,
  defaultTheme
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState(defaultTheme)

  return (
    <themeContext.Provider value={{ theme, setTheme }}>
      {children}
    </themeContext.Provider>
  )
}
