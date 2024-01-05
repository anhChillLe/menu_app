import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {useEffect, useState} from 'react'
import {
  InputNameScreen,
  LoginScreen,
  MenuScreen,
  OrderScreen,
  StartSessionScreen,
} from '~/screens'
import {useSession} from '~/wrappers/provider/session'

const Stack = createNativeStackNavigator()

const RootStack = () => {
  const {session} = useSession()
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)

  useEffect(() => {
    auth().onUserChanged(setUser)
    // auth().signOut()
  }, [])

  return (
    <Stack.Navigator screenOptions={props => ({headerShown: props.navigation.canGoBack(), headerShadowVisible: false})}>
      {!user ? (
        <Stack.Screen name="login" component={LoginScreen} />
      ) : !user.displayName ? (
        <Stack.Screen name="name" component={InputNameScreen} />
      ) : !!session ? (
        <Stack.Group>
          <Stack.Screen name="menu" component={MenuScreen} />
          <Stack.Screen name="order" component={OrderScreen} />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name="start" component={StartSessionScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  )
}

export default RootStack
