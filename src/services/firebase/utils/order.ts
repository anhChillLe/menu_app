import {Order, OrderByFood, OrderByUser} from '~/services/firebase/type/type'

export const reduceQuantity = (order: Order[]) => {
  return order.reduce<Order[]>((consumer, item) => {
    const existItem = consumer.find(it => compareOrder(it, item))

    if (existItem) existItem.quantity += item.quantity
    else consumer.push(item)

    return consumer
  }, [])
}

export const getUsersByFood = (
  orders: Order[],
  foodId: string,
): OrderByFood | undefined => {
  const filteredOrders = orders.filter(it => it.food.id === foodId)
  if (filteredOrders.length === 0) return undefined

  return filteredOrders.reduce<OrderByFood>(
    (accumulator, item) => {
      const {food, ...data} = item
      addItem(accumulator.orders, data, (t1, t2) => t1.user.id === t2.user.id)
      return accumulator
    },
    {
      orders: [],
      food: filteredOrders[0].food,
    },
  )
}

export const getFoodsByUser = (
  orders: Order[],
  userId: string,
): OrderByUser | undefined => {
  const filteredOrders = orders.filter(it => it.user.id === userId)
  if (filteredOrders.length === 0) return undefined

  return filteredOrders.reduce<OrderByUser>(
    (accumulator, item) => {
      const {user, ...data} = item
      addItem(accumulator.orders, data, (t1, t2) => t1.food.id === t2.food.id)
      return accumulator
    },
    {
      orders: [],
      user: filteredOrders[0].user,
    },
  )
}

const compareOrder = (order1: Order, order2: Order) => {
  return order1.food.id === order2.food.id && order1.user.id === order2.user.id
}

const addItem = <T extends {quantity: number}>(
  array: T[],
  item: T,
  comparator: (t1: T, t2: T) => boolean,
) => {
  const existItem = array.find(it => comparator(it, item))
  if (existItem) existItem.quantity += item.quantity
  else array.push(item)
}
