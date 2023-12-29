import {FC} from 'react'
import {Image} from 'react-native'
import {Button, Card, Text} from 'react-native-paper'
import {FoodData} from '~/services/firebase/type/type'

interface Props {
  item: FoodData
  onInsert: () => void
  onRemove: () => void
}

const MenuItem: FC<Props> = ({item, onInsert, onRemove}) => {
  const {name, description, price, url} = item

  return (
    <Card
      mode="contained"
      style={{padding: 16, flex: 1 / 2}}
      contentStyle={{gap: 4}}>
      <Image source={{uri: url}} style={{aspectRatio: 1, borderRadius: 8}} />
      <Text numberOfLines={1} variant="titleSmall">
        {name}
      </Text>
      <Text numberOfLines={1} ellipsizeMode="tail" variant="bodySmall">
        {description}
      </Text>
      <Button mode="contained" onPress={onInsert}>
        Add now
      </Button>
    </Card>
  )
}

export default MenuItem
