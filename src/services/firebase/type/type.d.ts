import {FirebaseAuthTypes} from '@react-native-firebase/auth'
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore'

type DData = FirebaseFirestoreTypes.DocumentData
type DS<T extends DData> = FirebaseFirestoreTypes.DocumentSnapshot<T>
type QDS<T extends DData> = FirebaseFirestoreTypes.QueryDocumentSnapshot<T>
type QS<T extends DData> = FirebaseFirestoreTypes.QuerySnapshot<T>
type DR<T extends DData> = FirebaseFirestoreTypes.DocumentReference<T>
type CR<T extends DData> = FirebaseFirestoreTypes.CollectionReference<T>
type DC<T extends DData> = FirebaseFirestoreTypes.DocumentChange<T>
type Query<T extends DData> = FirebaseFirestoreTypes.Query<T>
type GeoPoint = FirebaseFirestoreTypes.GeoPoint
type TimeStamp = FirebaseFirestoreTypes.Timestamp
type FBUser = FirebaseAuthTypes.User

type WithId<T> = T & {id: string}

// QR: menu_app://session?eateryId=&tableId=&menuId=

interface Menu {
  name: string
}

interface Food {
  name: string
  url: string
  group: string
  price: number
  description: string
}

interface Table {
  name: string
  maximumSeating: number | null
}

interface Eatery {
  name: string
  description: string
  address: string
  location: GeoPoint
  openAt: number // hour of day in miliseconds
  closeAt: number // hour of day in miliseconds
  createAt: TimeStamp
  updateAt: TimeStamp | null
  status: 'close' | 'open'
}

interface User {
  name: string | null
}

interface MenuInSession {
  name: string
  food: WithId<Food>[]
}

interface Session {
  menu: WithId<MenuInSession>
  tableRef: DR<Table>
  eateryRef: DR<Eatery>
  createBy: string
  startAt: TimeStamp
  endAt: TimeStamp | null
  submitHistory: TimeStamp[]
}

interface Order {
  food: WithId<Food>
  user: WithId<User>
  quantity: number
  submitAt: TimeStamp | null
}

interface OrderByUser {
  orders: Omit<Order, 'user'>[]
  user: WithId<User>
}

interface OrderByFood {
  orders: Omit<Order, 'food'>[]
  food: WithId<Food>
}

interface FoodGroup {
  group: string
  foods: WithId<Food>[]
}