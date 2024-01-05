import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import {
  Eatery,
  Food,
  Menu,
  MenuInSession,
  Session,
  Table,
  TimeStamp,
  WithId,
} from '~/services/firebase/type/type'

interface Props {
  menuId: string
  tableId: string
  eateryId: string
}

export namespace SessionManager {
  const store = firestore()
  const sessionRef = store.collection<Session>('session')

  const buildSession = async ({menuId, eateryId, tableId}: Props) => {
    const currentUser = auth().currentUser
    if (!currentUser) {
      throw Error('User not logined')
    }

    const eateryPath = `eatery/${eateryId}`
    const eateryRef = store.doc<Eatery>(eateryPath)

    const menuPath = `eatery/${eateryId}/menu/${menuId}`
    const menuRef = store.doc<Menu>(menuPath)

    const tablePath = `eatery/${eateryId}/table/${tableId}`
    const tableRef = store.doc<Table>(tablePath)

    const foodPath = `eatery/${eateryId}/menu/${menuId}/food`
    const foodRef = store.collection<Food>(foodPath)

    const memu = await menuRef.get()
    const food = (await foodRef.get()).docs.map<WithId<Food>>(it => ({
      id: it.id,
      ...it.data(),
    }))

    const cloneMenu: WithId<MenuInSession> = {
      id: memu.id,
      name: memu.data()?.name ?? 'Unknown',
      food,
    }

    const session: Session = {
      menu: cloneMenu,
      tableRef,
      eateryRef,
      createBy: currentUser.uid,
      startAt: firestore.FieldValue.serverTimestamp() as TimeStamp,
      endAt: null,
      submitHistory: [],
    }

    return session
  }

  const getActiveSession = async ({menuId, tableId, eateryId}: Props) => {
    const menuIdField = new firestore.FieldPath('menu', 'id')
    const tablePath = `eatery/${eateryId}/table/${tableId}`
    const tableRef = store.doc<Table>(tablePath)
    return sessionRef
      .where(menuIdField, '==', menuId)
      .where('tableRef', '==', tableRef)
      .where('endAt', '==', null)
      .get()
  }

  const createSession = async (props: Props) => {
    const activeSession = (await getActiveSession(props)).docs.at(0)
    if (activeSession?.exists) {
      return activeSession.ref
    } else {
      const newSession = await buildSession(props)
      return sessionRef.add(newSession)
    }
  }

  export const joinSession = async (props: Props) => {
    const currentUser = auth().currentUser
    if (!currentUser) {
      throw Error('User not logined')
    }
    const sessionRef = await createSession(props)

    sessionRef.collection('user').doc(currentUser.uid).set({
      name: currentUser.displayName,
    })
    
    return sessionRef
  }
}
