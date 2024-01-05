import firestore from '@react-native-firebase/firestore'

import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useState
} from 'react'
import { useCollection, useDocument } from '~/services/firebase/hook'

import {
  CR,
  DData,
  DR,
  DS,
  QS,
  User,
  WithId,
} from '~/services/firebase/type/type'

import { Eatery, Food, Order, Session } from '~/services/firebase/type/type'

interface StoreData {
  create: (ref: DR<Session>) => void
  session?: DS<Session>
  eatery?: DS<Eatery>
  food?: WithId<Food>[]
  user?: QS<User>
  order?: QS<Order>
  orderRef?: CR<Order>
}

const SessionContext = createContext<StoreData>({
  create: () => {},
})

const SessionProvider: FC<PropsWithChildren> = ({children}) => {
  const [ref, setRef] = useState<DR<Session>>()
  const orderRef = useMemo(() => getRef<Order>('order', ref?.path), [ref])
  const session = useDocument(ref)
  const order = useCollection(orderRef)
  const food = useMemo(() => session?.data()?.menu.food, [session])
  const eatery = useDocument(session?.data()?.eateryRef)
  const userRef = useMemo(() => getRef<User>('user', ref?.path), [ref])
  const user = useCollection(userRef)

  return (
    <SessionContext.Provider
      value={{
        create: setRef,
        session,
        eatery,
        user,
        food,
        order,
        orderRef,
      }}>
      {children}
    </SessionContext.Provider>
  )
}

export const useSession = () => useContext(SessionContext)

export default SessionProvider

const store = firestore()
const getRef = <T extends DData>(name: string, parentPath?: string) => {
  return parentPath ? store.collection<T>(parentPath + '/' + name) : undefined
}
