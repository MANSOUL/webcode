import jss, { StyleSheet } from 'jss'
import preset from 'jss-preset-default'
import useTheme from './useTheme'
import { Theme } from './interface'
import { isEqual } from 'lodash'

jss.setup(preset())

type StylesCallback<ClassKey extends string> = (
  theme: Theme
) => Record<ClassKey, any>

/**
 *
 * @param creator
 */
const createStyles = <ClassKey extends string>(
  creator: StylesCallback<ClassKey>
) => {
  let sheet: StyleSheet | null = null
  let prevStyles: Record<string, any> | null = null
  const useStyles = (): Record<ClassKey, string> => {
    const theme = useTheme()
    const styles = creator(theme.theme)
    // 如果当前和上一个样式的值一样，则直接返回
    if (isEqual(styles, prevStyles)) {
      return sheet?.classes || {}
    }
    sheet?.detach()
    prevStyles = styles
    sheet = jss.createStyleSheet(styles)
    const { classes } = sheet.attach()
    return classes
  }
  return useStyles
}

export default createStyles
