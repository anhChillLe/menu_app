import {
  DC,
  FBUser,
  Food,
  Order,
  User,
  WithId,
} from '~/services/firebase/type/type'

export const buildOrderItem = (user: FBUser, food: WithId<Food>): Order => {
  return {
    food,
    user: {
      name: user.displayName,
      id: user.uid,
    },
    quantity: 1,
    submitAt: null,
  }
}

export type GroupedData<T extends object, K extends keyof T = keyof T> = {
  key: T[K]
  data: Omit<T, K>[]
}

export function groupBy<T extends object, K extends keyof T>(
  array: T[],
  key: K,
  comparator: (t1: T[K], t2: T[K]) => boolean = (t1, t2) => t1 === t2,
) {
  return array.reduce<GroupedData<T, K>[]>((consumer, item) => {
    const existItem = consumer.find(it => comparator(it.key, item[key]))
    const {[key]: removeItem, ...data} = item

    if (existItem) existItem.data.push(data)
    else
      consumer.push({
        data: [data],
        key: item[key],
      })

    return consumer
  }, [])
}

export type comparator<T> = (t1: T, t2: T) => boolean

export const compareFood: comparator<WithId<Food>> = (f1, f2) => f1.id === f2.id
export const compareUser: comparator<WithId<User>> = (u1, u2) => u1.id === u2.id
export const compareOrder: comparator<Order> = (o1, o2) =>
  o1.user.id === o2.user.id && o1.food.id === o2.food.id
export const comapreOrderChange: comparator<DC<Order>> = (c1, c2) =>
  compareOrder(c1.doc.data(), c2.doc.data())

export const groupByAndMerge = <T extends object>(
  array: T[],
  comparator: comparator<T>,
  aggregator: (t1: T, t2: T) => T | null | undefined,
) => {
  return array.reduce<T[]>((result, item) => {
    const index = result.findIndex(it => comparator(it, item))

    if (index !== -1) {
      
      const mergeResult = aggregator(result[index], item)
      if (mergeResult === null) result.splice(index, 1)
      else if (mergeResult === undefined) result.push(item)
      else result[index] = mergeResult

    } else result.push(item)

    return result
  }, [])
}
