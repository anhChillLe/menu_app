import auth from '@react-native-firebase/auth'
import {useCallback, useState} from 'react'
import {ImageBackground, StyleSheet} from 'react-native'
import {Button, Card, TextInput} from 'react-native-paper'
import Toast from 'react-native-toast-message'
import {Images} from '~/assets/images'

const InputNameScreen = () => {
  const [name, setName] = useState('')

  const updateName = useCallback(() => {
    if(name == ''){
      Toast.show({
        text1: 'Name can not be empty',
        type: 'error'
      })
      return
    }

    auth().currentUser?.updateProfile({displayName: name})
  }, [name])

  return (
    <ImageBackground style={styles.container} source={Images.landing}>
      <Card contentStyle={{padding: 16, gap: 24}}>
        <TextInput
          placeholder="Name"
          mode="outlined"
          value={name}
          onChangeText={setName}
        />
        <Button mode="contained" onPress={updateName}>
          Start now
        </Button>
      </Card>
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

export default InputNameScreen
