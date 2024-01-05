import auth from '@react-native-firebase/auth'
import { ReactNode, useEffect } from 'react'
import Toast from 'react-native-toast-message'
import { useQueue } from '~/hooks/queue'
import { DC, DData, Order, QS } from '~/services/firebase/type/type'
import { useSession } from '~/wrappers/provider/session'

export const OrderChangeListener = ({children}: {children: ReactNode}) => {
  const {user, order} = useSession()
  useChange(user, dc => `${dc.doc.data().name} đã vào`)
  useChange(order, getOrderMessage)
  return children
}

function useChange<T extends DData>(
  qs: QS<T> | undefined,
  toMessage: (dc: DC<T>) => string,
) {
  const {enqueue, dequeue, peek, data: queue} = useQueue<DC<T>>()

  useEffect(() => {
    if (!qs) return
    const changes = qs.docChanges()
    changes.forEach(enqueue)
  }, [qs])

  useEffect(() => {
    const dc = peek()
    if (dc) {
      Toast.hide()
      Toast.show({
        text1: toMessage(dc),
        autoHide: true,
        onHide: dequeue,
        type: typeMapNoti[dc.type],
      })
    }
  }, [queue])
}

const getOrderMessage = (dc: DC<Order>) => {
  const currentUser = auth().currentUser
  const data = dc.doc.data()
  const userName = data.user.name
  const foodName = data.food.name
  const isCurrentUser = data.user.id === currentUser?.uid
  const messageHeader = `${isCurrentUser ? 'Đã' : `${userName} đã`}`
  const messageAction = typeMap[dc.type]
  const messageContent = `${foodName} x ${data.quantity}`

  return `${messageHeader} ${messageAction} ${messageContent}`
}

const typeMap = {
  added: 'thêm',
  removed: 'xóa',
  modified: 'thay đổi',
}

const typeMapNoti = {
  added: 'success',
  removed: 'error',
  modified: 'info',
}
