import firestore from '@react-native-firebase/firestore'

import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react'
import {useCollection, useDocument, useQuery} from '~/services/firebase/hook'

import {
  CR,
  Collection,
  DData,
  DR,
  DS,
  EateryData,
  FoodData,
  MenuData,
  OrderData,
  QS,
  SessionData,
  TableData,
  UserInsessionData,
} from '~/services/firebase/type/type'

interface StoreData {
  create: (id: string) => void
  session?: DS<SessionData>
  menu?: DS<MenuData>
  table?: DS<TableData>
  eatery?: DS<EateryData>
  food?: QS<FoodData>
  user?: Collection<UserInsessionData>
  order?: Collection<OrderData>
}

const SessionContext = createContext<StoreData>({
  create: () => {},
})

const store = firestore()
const ssRef = store.collection<SessionData>('session')
const foodRef = store.collection<FoodData>('food')

const SessionProvider: FC<PropsWithChildren> = ({children}) => {
  const [ref, setRef] = useState<DR<SessionData>>()
  const create = useCallback((id: string) => setRef(ssRef.doc(id)), [])

  const session = useDocument(ref)

  const menu = useDocument(session?.data()?.menuRef)
  const table = useDocument(session?.data()?.tableRef)

  const foodQuery = menu ? foodRef.where('menuId', '==', menu.id) : undefined
  const food = useQuery(foodQuery)

  const eatery = useDocument(table?.data()?.eateryRef)

  const userRef = getRef<UserInsessionData>('user', session?.ref.path)
  const user = useCollection(userRef)

  const orderRef = getRef<OrderData>('order', session?.ref.path)
  const order = useCollection(orderRef)

  return (
    <SessionContext.Provider
      value={{
        create,
        session,
        menu,
        eatery,
        table,
        food,
        user: user &&
          userRef && {
            data: user,
            ref: userRef,
          },
        order: order &&
          orderRef && {
            data: order,
            ref: orderRef,
          },
      }}>
      {children}
    </SessionContext.Provider>
  )
}

export const useSession = () => useContext(SessionContext)

export default SessionProvider

const getRef = <T extends DData>(name: string, parentPath?: string) => {
  return parentPath ? store.collection<T>(parentPath + '/' + name) : undefined
}
