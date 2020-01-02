export interface TokenColor {
  name: string
  scope: string | string[]
  settings: {
    foreground?: string
    fontStyle?: string
  }
}

export interface Theme {
  name: string
  type: string
  colors: {
    focusBorder: string
    foreground: string
    'widget.shadow': string
    'selection.background': string
    errorForeground: string
    'textLink.activeForeground': string
    'textLink.foreground': string
    'button.background': string
    'dropdown.background': string
    'dropdown.listBackground': string
    'input.background': string
    'inputOption.activeBorder': string
    'inputValidation.errorBackground': string
    'inputValidation.errorBorder': string
    'scrollbar.shadow': string
    'scrollbarSlider.activeBackground': string
    'scrollbarSlider.background': string
    'scrollbarSlider.hoverBackground': string
    'badge.foreground': string
    'badge.background': string
    'progressBar.background': string
    'list.activeSelectionBackground': string
    'list.activeSelectionForeground': string
    'list.dropBackground': string
    'list.focusBackground': string
    'list.focusForeground': string
    'list.highlightForeground': string
    'list.hoverBackground': string
    'list.hoverForeground': string
    'list.inactiveSelectionBackground': string
    'list.inactiveSelectionForeground': string
    'list.inactiveFocusBackground': string
    'list.errorForeground': string
    'list.warningForeground': string
    'activityBar.background': string
    'activityBar.dropBackground': string
    'activityBar.foreground': string
    'activityBarBadge.background': string
    'activityBarBadge.foreground': string
    'sideBar.background': string
    'sideBar.foreground': string
    'sideBar.dropBackground': string
    'sideBarSectionHeader.background': string
    'sideBarSectionHeader.foreground': string
    'editorGroup.border': string
    'editorGroup.dropBackground': string
    'editorGroupHeader.tabsBackground': string
    'tab.border': string
    'tab.activeBorder': string
    'tab.inactiveBackground': string
    'editor.background': string
    'editor.foreground': string
    'editorLineNumber.foreground': string
    'editorLineNumber.activeForeground': string
    'editorCursor.background': string
    'editorCursor.foreground': string
    'editor.selectionBackground': string
    'editor.selectionHighlightBackground': string
    'editor.wordHighlightBackground': string
    'editor.wordHighlightStrongBackground': string
    'editor.findMatchBackground': string
    'editor.findMatchHighlightBackground': string
    'editor.findRangeHighlightBackground': string
    'editor.hoverHighlightBackground': string
    'editor.lineHighlightBackground': string
    'editor.rangeHighlightBackground': string
    'editorIndentGuide.background': string
    'editorIndentGuide.activeBackground': string
    'editorRuler.foreground': string
    'editorCodeLens.foreground': string
    'editorBracketMatch.background': string
    'editorBracketMatch.border': string
    'editorOverviewRuler.border': string
    'editorOverviewRuler.findMatchForeground': string
    'editorOverviewRuler.modifiedForeground': string
    'editorOverviewRuler.addedForeground': string
    'editorOverviewRuler.deletedForeground': string
    'editorOverviewRuler.errorForeground': string
    'editorOverviewRuler.warningForeground': string
    'editorOverviewRuler.bracketMatchForeground': string
    'editorError.foreground': string
    'editorWarning.foreground': string
    'editorGutter.modifiedBackground': string
    'editorGutter.addedBackground': string
    'editorGutter.deletedBackground': string
    'diffEditor.insertedTextBackground': string
    'diffEditor.removedTextBackground': string
    'editorWidget.background': string
    'editorWidget.border': string
    'editorSuggestWidget.highlightForeground': string
    'peekView.border': string
    'peekViewEditor.background': string
    'peekViewEditor.matchHighlightBackground': string
    'peekViewResult.background': string
    'peekViewResult.matchHighlightBackground': string
    'peekViewResult.selectionBackground': string
    'peekViewTitle.background': string
    'panelTitle.activeBorder': string
    'statusBar.background': string
    'statusBar.foreground': string
    'statusBar.debuggingBackground': string
    'statusBar.debuggingForeground': string
    'statusBar.noFolderBackground': string
    'statusBarItem.hoverBackground': string
    'statusBarItem.prominentBackground': string
    'statusBarItem.prominentHoverBackground': string
    'titleBar.activeBackground': string
    'titleBar.inactiveBackground': string
    'extensionButton.prominentBackground': string
    'extensionButton.prominentHoverBackground': string
    'pickerGroup.foreground': string
    'terminal.background': string
    'terminal.foreground': string
    'terminal.ansiBlack'?: string
    'terminal.ansiBlue': string
    'terminal.ansiBrightBlue': string
    'terminal.ansiBrightCyan': string
    'terminal.ansiBrightGreen': string
    'terminal.ansiBrightMagenta': string
    'terminal.ansiBrightRed': string
    'terminal.ansiBrightYellow': string
    'terminal.ansiCyan': string
    'terminal.ansiGreen': string
    'terminal.ansiMagenta': string
    'terminal.ansiRed': string
    'terminal.ansiYellow': string
    'terminal.selectionBackground': string
    'terminalCursor.background': string
    'terminalCursor.foreground': string
    'debugToolBar.background': string
    'walkThrough.embeddedEditorBackground': string
    'gitDecoration.addedResourceForeground': string
    'gitDecoration.modifiedResourceForeground': string
    'gitDecoration.deletedResourceForeground': string
    'gitDecoration.untrackedResourceForeground': string
    'gitDecoration.ignoredResourceForeground': string
    'breadcrumbPicker.background': string
  }
  tokenColors: TokenColor[]
}

export interface ThemeProviderProps {
  children: any
  defaultTheme: Theme
  currentTheme?: string
}

export interface MonacoThemeRule {
  foreground?: string
  fontStyle?: string
  token: string
  background?: string
}

export interface ThemeContextProps {
  theme: Theme
  setTheme: (themeName: string) => void
  themes: { name: string; url: string }[]
  current: string
}
