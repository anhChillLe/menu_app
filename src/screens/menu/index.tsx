import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native'
import { useMemo } from 'react'
import { Animated, SafeAreaView, ScrollView, View } from 'react-native'
import { Avatar, Card, Divider, Text, useTheme } from 'react-native-paper'
import MenuItem from '~/components/organisms/menu_item'
import { Food, WithId } from '~/services/firebase/type/type'
import { buildOrderItem, compareFood, groupBy } from '~/services/firebase/utils'
import { groupByGroup } from '~/services/firebase/utils/food'
import { getUsersByFood } from '~/services/firebase/utils/order'
import { useSession } from '~/wrappers/provider/session'

const MenuScreen = () => {
  const {colors} = useTheme()
  const navigation = useNavigation()
  const {orderRef, food, order} = useSession()
  const user = auth().currentUser!

  const handleInsert = (item: WithId<Food>) => {
    orderRef?.add(buildOrderItem(user, item))
  }

  const hanleRemove = (item: WithId<Food>) => {
    if (!order) return
    for (let i = 0; i < order.docs.length; i++) {
      const data = order.docs[i].data()
      const orderUser = data.user
      const food = data.food
      if (food.id === item.id && orderUser.id === user.uid) {
        order.docs[i].ref.delete()
        break
      }
    }
  }

  const totalPrice = useMemo(
    () =>
      order?.docs.reduce((sum, item) => {
        const itemPrice = item.data().food.price
        return sum + itemPrice
      }, 0),
    [order],
  )

  const groups = useMemo(
    () =>
      groupByGroup(food ?? []).map(it => {
        return {title: it.group, data: it.foods}
      }),
    [food],
  )

  return (
    <SafeAreaView
      style={{flex: 1, marginHorizontal: 24, alignItems: 'stretch'}}>
      <Animated.SectionList
        sections={groups}
        ListHeaderComponent={Header}
        contentContainerStyle={{gap: 16, paddingVertical: 16}}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          const orderData = order?.docs.map(it => it.data()) ?? []
          const orderByFood = groupBy(orderData, 'food', compareFood).filter(it => compareFood(it.key, item)).at(0)

          return (
            <MenuItem
              item={item}
              onInsert={() => handleInsert(item)}
              onRemove={() => hanleRemove(item)}
              currentUser={user}
              orderByFood={orderByFood}
            />
          )
        }}
        renderSectionHeader={({section: {title}}) => (
          <Text
            variant="titleLarge"
            style={{fontWeight: 'bold', backgroundColor: colors.background}}>
            {title}
          </Text>
        )}
      />
      <View style={{paddingVertical: 8}}>
        {!order?.empty && (
          <Card
            mode="contained"
            contentStyle={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 12,
            }}
            onPress={() => navigation.navigate('order' as never)}
            style={{
              backgroundColor: colors.primary,
            }}>
            <Text style={{fontWeight: 'bold', color: colors.onPrimary}}>
              Giỏ hàng{'   |   '}
            </Text>
            <Text variant="titleSmall" style={{color: colors.onPrimary}}>
              {order?.size ?? 0} món
            </Text>
            <View style={{flex: 1}} />
            <Text
              style={{color: colors.onPrimary, fontWeight: 'bold'}}
              numberOfLines={1}
              variant="titleMedium">
              {totalPrice?.toComasString()}đ
            </Text>
          </Card>
        )}
      </View>
    </SafeAreaView>
  )
}

const Header = () => {
  return (
    <View style={{gap: 16, alignItems: 'stretch'}}>
      <EateryCard />
      <UserGroup />
    </View>
  )
}

const EateryCard = () => {
  const {eatery} = useSession()
  const data = eatery?.data()
  if (!data) return null

  const {address, closeAt, description, name, openAt, status} = data

  return (
    <Card mode="outlined" contentStyle={{padding: 16, gap: 8}}>
      <Text variant="titleLarge" style={{fontWeight: 'bold'}}>
        {name}
      </Text>
      <Text variant="labelMedium">{description}</Text>
      <Divider />
      <Text variant="bodySmall">{address}</Text>
      <Divider />
      <Text variant="bodySmall">
        Mở cửa: {openAt / 3600000}h đến {closeAt / 3600000}h
      </Text>
      <Divider />
      <Text variant="bodySmall">
        Trạng thái: {status === 'open' ? 'Mở cửa' : 'Đóng cửa'}
      </Text>
    </Card>
  )
}

const UserGroup = () => {
  const {user} = useSession()

  return (
    <View style={{gap: 4}}>
      <Text variant="titleMedium">Đang chọn cùng bạn</Text>
      <ScrollView horizontal contentContainerStyle={{gap: 2, flex: 1}}>
        {user?.docs.map(it => (
          <Avatar.Text
            key={it.id}
            label={it.data()?.name ?? '?'}
            size={32}
            labelStyle={{fontSize: 8}}
          />
        ))}
      </ScrollView>
    </View>
  )
}

export default MenuScreen
