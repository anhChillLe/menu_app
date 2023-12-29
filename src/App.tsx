import {NavigationContainer} from '@react-navigation/native'
import React, {ReactNode} from 'react'
import {PaperProvider} from 'react-native-paper'
import {AppThemeProvider, useAppColorScheme} from '~/wrappers/provider/theme'
import {AppDarkTheme, AppLightTheme} from '~/wrappers/provider/theme/data'
import RootStack from './navigation'
import SessionProvider from '~/wrappers/provider/session'
import Toast from 'react-native-toast-message'
import {withOrderChangeListener} from '~/wrappers/hoc/session_listener'

function App() {
  return (
    <AppProvider>
      <RootStack />
    </AppProvider>
  )
}

function AppProvider({children}: {children: ReactNode}) {
  const {colorScheme, isDark, setColorScheme} = useAppColorScheme()
  const theme = isDark ? AppDarkTheme : AppLightTheme

  return (
    <AppThemeProvider value={{colorScheme, isDark, setColorScheme}}>
      <PaperProvider theme={theme}>
        <NavigationContainer theme={theme}>
          <SessionProvider>{withOrderChangeListener(children)}</SessionProvider>
          <Toast />
        </NavigationContainer>
      </PaperProvider>
    </AppThemeProvider>
  )
}

export default App
