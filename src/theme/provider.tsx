import React from 'react'
import { ThemeProviderProps } from './interface'
import themeContext from './context'
import themes from '@src/config/themes.json'
import mFetch from '@src/utils/mFetch'

const getThemeByName = (
  themes: { name: string; url: string }[],
  name: string
) => {
  return themes.find(theme => theme.name === name)
}

export default function ThemeProvider({
  children,
  defaultTheme,
  currentTheme = 'Horizon'
}: ThemeProviderProps) {
  const [theme, setTheme] = React.useState(defaultTheme)
  const [current, setCurrent] = React.useState(currentTheme)

  const requestTheme = async (themeName: string) => {
    setCurrent(themeName)
    const nextTheme = getThemeByName(themes, themeName)
    if (nextTheme) {
      try {
        const mTheme = await mFetch(nextTheme.url)
        setTheme(mTheme)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <themeContext.Provider
      value={{ theme, setTheme: requestTheme, themes, current }}
    >
      {children}
    </themeContext.Provider>
  )
}
