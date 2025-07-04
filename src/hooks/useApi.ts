import { useState, useCallback } from 'react'

interface UseApiState<T> {
  loading: boolean
  error: string | null
  data: T | null
}

interface UseApiReturn<T, P extends unknown[]> {
  execute: (...args: P) => Promise<T | null>
  loading: boolean
  error: string | null
  data: T | null
  reset: () => void
}

export const useApi = <T, P extends unknown[]>(
  apiFunction: (...args: P) => Promise<T>
): UseApiReturn<T, P> => {
  const [state, setState] = useState<UseApiState<T>>({
    loading: false,
    error: null,
    data: null
  })

  const execute = useCallback(async (...args: P): Promise<T | null> => {
    setState(prev => ({ ...prev, loading: true, error: null }))

    try {
      const result = await apiFunction(...args)
      setState({
        loading: false,
        error: null,
        data: result
      })
      return result
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido'
      setState({
        loading: false,
        error: errorMessage,
        data: null
      })
      return null
    }
  }, [apiFunction])

  const reset = useCallback(() => {
    setState({
      loading: false,
      error: null,
      data: null
    })
  }, [])

  return {
    execute,
    loading: state.loading,
    error: state.error,
    data: state.data,
    reset
  }
}