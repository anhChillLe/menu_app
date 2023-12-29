import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {useEffect, useState} from 'react'
import {LoginScreen, MenuScreen} from '~/screens'
import {useSession} from '~/wrappers/provider/session'

const Stack = createNativeStackNavigator()

const RootStack = () => {
  const {create} = useSession()
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)

  useEffect(() => {
    auth().onUserChanged(setUser)
  }, [])

  useEffect(() => {
    !!user && create('KBf4XYJoxzlpBlXSSVhk')
  }, [user])

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {!user ? (
        <Stack.Screen name="login" component={LoginScreen} />
      ) : (
        <Stack.Screen name="menu" component={MenuScreen} />
      )}
    </Stack.Navigator>
  )
}

export default RootStack
