import auth from '@react-native-firebase/auth'
import {useCallback} from 'react'
import {ImageBackground, StatusBar, StyleSheet} from 'react-native'
import {Button} from 'react-native-paper'
import {Images} from '~/assets/images'

const LoginScreen = () => {
  const login = useCallback(() => {
    auth().signInAnonymously()
  }, [])

  return (
    <ImageBackground style={styles.container} source={Images.landing}>
      <StatusBar barStyle="light-content" />
      <Button mode="contained" onPress={login}>
        Next
      </Button>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  card: {
    padding: 24,
    gap: 16,
  },
})

export default LoginScreen
