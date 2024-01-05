import {Food, FoodGroup, WithId} from '~/services/firebase/type/type'

export const groupByGroup = (foods: WithId<Food>[]) => {
  return foods.reduce<FoodGroup[]>((consumer, item) => {
    const existItem = consumer.find(it => it.group === item.group)
    if (existItem) existItem.foods.push(item)
    else
      consumer.push({
        group: item.group,
        foods: [item],
      })

    return consumer
  }, [])
}
