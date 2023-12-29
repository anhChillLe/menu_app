import {FlatList, SafeAreaView} from 'react-native'
import MenuItem from '~/components/organisms/menu_item'
import { FoodData, QDS } from '~/services/firebase/type/type'
import {useSession} from '~/wrappers/provider/session'
import auth from '@react-native-firebase/auth'

const MenuScreen = () => {
  const {food, order} = useSession()
  const user = auth().currentUser

  const handleInsert = (item: QDS<FoodData>) => {
    order?.ref.add({
      foodId: item.id,
      userId: user!.uid,
      quantity: 1
    })
  }

  return (
    <SafeAreaView style={{flex: 1, margin: 16}}>
      <FlatList
        data={food?.docs ?? []}
        numColumns={2}
        columnWrapperStyle={{gap: 16}}
        contentContainerStyle={{gap: 16}}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <MenuItem
            item={item.data()}
            onInsert={() => handleInsert(item)}
            onRemove={() => {}}
          />
        )}
      />
    </SafeAreaView>
  )
}

export default MenuScreen
