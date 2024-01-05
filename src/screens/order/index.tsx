import {useMemo} from 'react'
import {Animated, Image, SafeAreaView, View} from 'react-native'
import {Text} from 'react-native-paper'
import {compareFood, groupBy} from '~/services/firebase/utils'
import {useSession} from '~/wrappers/provider/session'

const OrderScreen = () => {
  const {order} = useSession()
  const orderData = useMemo(
    () => order?.docs.map(it => it.data()) ?? [],
    [order],
  )

  return (
    <SafeAreaView style={{flex: 1}}>
      <Animated.FlatList
        data={groupBy(orderData, 'food', compareFood)}
        contentContainerStyle={{gap: 8, padding: 16}}
        keyExtractor={(item) => item.key.id}
        renderItem={({item}) => {
          const {key, data} = item
          const quantity = data.reduce((sum, it) => sum + it.quantity, 0)

          return (
            <View
              style={{flexDirection: 'row', gap: 8, padding: 8}}>
              <Image
                source={{uri: key.url}}
                style={{aspectRatio: 1, height: 64, borderRadius: 8}}
              />
              <View>
                <Text variant="titleMedium" style={{fontWeight: '400'}}>
                  {key.name}
                </Text>
                <Text style={{fontWeight: 'bold'}} variant="titleMedium">
                  {key.price.toComasString()}đ
                </Text>
                <Text variant="bodySmall" style={{fontWeight: '300'}}>
                  {data.map(it => it.user.name).join(', ')} đã thêm x{quantity}
                </Text>
              </View>
            </View>
          )
        }}
      />
    </SafeAreaView>
  )
}

export default OrderScreen
