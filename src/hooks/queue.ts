import {useCallback, useState} from 'react'

export function useQueue<T>(initData: T[] = []) {
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

  const peek = useCallback(() => {
    return data[0]
  }, [data])

  return {
    enqueue,
    dequeue,
    peek,
    data
  }
}
