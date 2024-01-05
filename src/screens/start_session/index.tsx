import {useState} from 'react'
import {SafeAreaView} from 'react-native'
import {Button, Card, TextInput} from 'react-native-paper'
import {SessionManager} from '~/services/firebase/utils/session'
import {useSession} from '~/wrappers/provider/session'

const StartSessionScreen = () => {
  const {create} = useSession()
  const [eatery, setEatery] = useState('XatIuSkI3soilu3aXQ6P')
  const [menu, setMenu] = useState('uIQttijdZ4e7giZkEWOH')
  const [table, setTable] = useState('ZrhroeUHPQzWLbUocRtw')

  const hanleStart = () => {
    SessionManager.joinSession({
      eateryId: eatery,
      menuId: menu,
      tableId: table,
    }).then(create)
  }

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Card mode="contained" contentStyle={{padding: 24, gap: 16}}>
        <TextInput mode='outlined' label="Eatery" value={eatery} onChangeText={setEatery}/>
        <TextInput mode='outlined' label="Menu" value={menu} onChangeText={setMenu}/>
        <TextInput mode='outlined' label="Table" value={table} onChangeText={setTable}/>
        <Button mode='contained' onPress={hanleStart}>Start</Button>
      </Card>
    </SafeAreaView>
  )
}

export default StartSessionScreen
