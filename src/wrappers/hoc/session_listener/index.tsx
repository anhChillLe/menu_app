import {ReactNode, useEffect} from 'react'
import Toast from 'react-native-toast-message'
import {useSession} from '~/wrappers/provider/session'

export const withOrderChangeListener = (children: ReactNode) => {
  const {food, order, user} = useSession()

  useEffect(() => {
    const docs = order?.data.docChanges()
    console.log(docs)
  }, [user?.data.docChanges()])

  return children
}
