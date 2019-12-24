import jss, { StyleSheet } from 'jss'
import preset from 'jss-preset-default'
import useTheme from './useTheme'
import { Theme } from './interface'

jss.setup(preset())

/**
 *
 * @param creator
 */
const createStyles = (creator: (theme: Theme) => Record<string, any>) => {
  let sheet: StyleSheet | null = null
  const useStyles = () => {
    if (sheet) sheet.detach()
    const theme = useTheme()
    const styles = creator(theme)
    sheet = jss.createStyleSheet(styles)
    const { classes } = sheet.attach()
    return classes
  }
  return useStyles
}

export default createStyles
