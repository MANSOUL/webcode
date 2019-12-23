import React from 'react'
import { ThemeProviderProps } from './interface'
import themeContext from './context'

export default function ThemeProvider({ children, theme }: ThemeProviderProps) {
  return <themeContext.Provider value={theme}>{children}</themeContext.Provider>
}
