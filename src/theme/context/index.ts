import React from 'react'
import { ThemeContextProps } from '../interface'
import defaultTheme from '../assets/horizon.json'

const themeContext = React.createContext<ThemeContextProps>({
  theme: defaultTheme,
  setTheme: () => {}
})

export default themeContext
