import jss from 'jss'
import preset from 'jss-preset-default'
import useTheme from './useTheme'
import { Theme } from './interface'

jss.setup(preset())

/**
 *
 * @param creator
 */
const createStyles = (creator: (theme: Theme) => Record<string, any>) => {
  const useStyles = () => {
    const theme = useTheme()
    const styles = creator(theme)
    const { classes } = jss.createStyleSheet(styles).attach()
    return classes
  }
  return useStyles
}

export default createStyles
