import { useEffect, useState } from 'react'
import { CR, DData, DR, DS, QS, Query } from '~/services/firebase/type/type'

export const useDocument = <T extends DData>(ref?: DR<T>) => {
  const [data, setData] = useState<DS<T>>()

  useEffect(() => {
    ref?.get().then(setData)
  }, [ref])

  return data
}

export const useQuery = <T extends DData>(query?: Query<T>) => {
  const [data, setData] = useState<QS<T>>()

  useEffect(() => {
    const subscriber = query?.onSnapshot(setData)
    return subscriber
  }, [query])

  return data
}

export const useCollection = <T extends DData>(ref?: CR<T>) => {
  const [data, setData] = useState<QS<T>>()

  useEffect(() => {
    const subscriber = ref?.onSnapshot(setData)
    return subscriber
  }, [ref])

  return data
}