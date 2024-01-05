import {NavigationContainer} from '@react-navigation/native'
import React, {ReactNode} from 'react'
import {PaperProvider} from 'react-native-paper'
import {AppThemeProvider, useAppColorScheme} from '~/wrappers/provider/theme'
import {AppDarkTheme, AppLightTheme} from '~/wrappers/provider/theme/data'
import RootStack from './navigation'
import SessionProvider from '~/wrappers/provider/session'
import Toast from 'react-native-toast-message'
import {OrderChangeListener} from '~/wrappers/provider/session_listener'
import './utils/helper'

function App() {
  return (
    <AppProvider>
      <RootStack />
      <Toast />
    </AppProvider>
  )
}

function AppProvider({children}: {children: ReactNode}) {
  const {colorScheme, isDark, setColorScheme} = useAppColorScheme()
  const theme = isDark ? AppDarkTheme : AppLightTheme

  return (
    <AppThemeProvider value={{colorScheme, isDark, setColorScheme}}>
      <SessionProvider>
        <PaperProvider theme={theme}>
          <NavigationContainer theme={theme}>
            <OrderChangeListener>{children}</OrderChangeListener>
          </NavigationContainer>
        </PaperProvider>
      </SessionProvider>
    </AppThemeProvider>
  )
}

export default App
