import React from 'react'
import {useColorScheme} from 'react-native'

export type AppColorScheme = 'light' | 'dark' | 'auto'

export type SchemeData = {
  setColorScheme: (scheme: AppColorScheme) => void,
  colorScheme: AppColorScheme,
  isDark: boolean,
}

export const useAppColorScheme = (theme: AppColorScheme = 'light') : SchemeData=> {
  const systemColorScheme = useColorScheme() ?? 'light'
  const [colorScheme, setColorScheme] = React.useState<AppColorScheme>(theme)

  const isDark = React.useMemo(() => {
    return (() => {
      switch (colorScheme) {
        case 'light':
          return false
        case 'dark':
          return true
        case 'auto':
          return systemColorScheme == 'dark'
      }
    })()
  }, [colorScheme])

  return {
    isDark,
    colorScheme,
    setColorScheme,
  }
}

const ThemeContext = React.createContext<SchemeData>({
  setColorScheme: () => {},
  colorScheme: "dark",
  isDark: false,
});

export const useAppColorSchemeData = () => {
  const data = React.useContext(ThemeContext)
  return data
}

export const AppThemeProvider = ThemeContext.Provider