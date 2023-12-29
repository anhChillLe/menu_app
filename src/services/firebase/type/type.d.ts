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

type DChangeType = FirebaseFirestoreTypes.DocumentChangeType
type GeoPoint = FirebaseFirestoreTypes.GeoPoint
type TimeStamp = FirebaseFirestoreTypes.Timestamp
type FBUser = FirebaseAuthTypes.User

interface Collection<T extends DData> {
  data: QS<T>
  ref: CR<T>
}

interface EateryData extends DData {
  address: string
  location: GeoPoint
  name: string
  description: string
}

interface FoodData extends DData {
  url: string
  name: string
  description: string
  price: string
  menuId: string
}

interface MenuData extends DData {
  eateryId: string
  name: string
}

interface TableData extends DData {
  eateryId: string
  name: string
  eateryRef: DR<EateryData>
}

interface OrderData extends DData {
  userId: string
  foodId: string
  quantity: number
}

interface SessionData extends DData {
  menuRef: DR<MenuData>
  tableRef: DR<TableData>
}

interface UserInsessionData extends DData {
  name: string
}
