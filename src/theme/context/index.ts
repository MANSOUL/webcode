import React from 'react'
import { Theme } from '../interface'
import defaultTheme from '../assets/horizon.json'

const themeContext = React.createContext<Theme>(defaultTheme)

export default themeContext
