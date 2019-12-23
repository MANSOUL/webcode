import React from 'react'
import themeContext from './context'

export default function useTheme() {
  return React.useContext(themeContext)
}
