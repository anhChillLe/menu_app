import { FC } from 'react'
import { Image, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import {
  FBUser,
  Food,
  Order,
  WithId
} from '~/services/firebase/type/type'
import { GroupedData } from '~/services/firebase/utils'

interface Props {
  item: WithId<Food>
  orderByFood?: GroupedData<Order, 'food'>
  currentUser: FBUser
  onInsert: () => void
  onRemove: () => void
}

const MenuItem: FC<Props> = ({
  item,
  onInsert,
  orderByFood,
  onRemove,
  currentUser: user,
}) => {
  const {name, price, url} = item
  const isAddedByUser = orderByFood?.data.some(it => it.user.id === user.uid)

  return (
    <View style={{flex: 1 / 2, gap: 8, height: 128, flexDirection: 'row'}}>
      <Image source={{uri: url}} style={{aspectRatio: 1, borderRadius: 8}} />
      <View style={{justifyContent: 'space-between'}}>
        <View>
          <Text numberOfLines={1} variant="bodyLarge">
            {name}
          </Text>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            variant="titleMedium"
            style={{fontWeight: 'bold'}}>
            {price.toComasString()} vnd
          </Text>
          <Text
            variant="labelSmall"
            style={{fontWeight: 'normal'}}
            numberOfLines={2}>
            {orderByFood?.data.map(it => `${it.user.name} x${it.quantity}`).join(', ')}
          </Text>
        </View>
        <View style={{flexDirection: 'row', gap: 8}}>
          <Button
            mode="outlined"
            style={{marginTop: 4}}
            labelStyle={{fontSize: 12}}
            onPress={onRemove}
            disabled={!isAddedByUser}>
            -
          </Button>
          <Button
            mode="outlined"
            style={{marginTop: 4}}
            labelStyle={{fontSize: 12}}
            onPress={onInsert}>
            +
          </Button>
        </View>
      </View>
    </View>
  )
}

export default MenuItem
