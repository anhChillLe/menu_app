import {useCallback, useState} from 'react'

export function useQueue<T>(initData: T[]) {
  const [data, setData] = useState<T[]>(initData)

  const isEmpty = data.length == 0

  const enqueue = useCallback((item: T) => {
    setData(data => [...data, item])
  }, [])

  const dequeue = useCallback(() => {
    if (!isEmpty) {
      const [firstItem, ...newData] = data
      setData(newData)
      return firstItem
    }
  }, [data])

  return {
    enqueue,
    dequeue,
    isEmpty,
    data
  }
}
