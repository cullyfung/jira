import { Task } from '@/types/task'
import { QueryKey, useMutation, useQuery } from 'react-query'
import { SortProps } from './board'
import { useHttp } from './http'
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
  useReorderTaskConfig
} from './use-optimistic-options'

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp()
  return useQuery<Task[]>(['tasks', param], () =>
    client('tasks', { data: param })
  )
}

export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks`, {
        method: 'POST',
        data: params
      }),
    useAddConfig(queryKey)
  )
}

export const useEditTask = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks/${params.id}`, {
        method: 'PATCH',
        data: params
      }),
    useEditConfig(queryKey)
  )
}

export const useDeleteTask = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    ({ id }: { id: number }) =>
      client(`tasks/${id}`, {
        method: 'DELETE'
      }),
    useDeleteConfig(queryKey)
  )
}

export const useTask = (id?: number) => {
  const client = useHttp()
  return useQuery<Task>(['task', { id }], () => client(`tasks/${id}`), {
    enabled: !!id
  })
}

export const useReorderTask = (queryKey: QueryKey) => {
  const client = useHttp()
  return useMutation(
    (params: SortProps) =>
      client('tasks/reorder', {
        data: params,
        method: 'POST'
      }),
    useReorderTaskConfig(queryKey)
  )
}
