import { useEffect, useState } from 'react'
import type { Task, TaskFilter } from '../types/task'
import { loadTasks, saveTasks } from '../utils/taskStorage'

function createId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks)
  const [filter, setFilter] = useState<TaskFilter>('all')

  useEffect(() => saveTasks(tasks), [tasks])

  const activeCount = tasks.filter((task) => !task.completed).length
  const completedCount = tasks.length - activeCount
  const filteredTasks = filter === 'all'
    ? tasks
    : tasks.filter((task) => filter === 'active' ? !task.completed : task.completed)

  function addTask(value: string, description = '') {
    const text = value.trim()
    if (!text) return false

    const details = description.trim()
    setTasks((current) => [{
      id: createId(),
      text,
      ...(details ? { description: details } : {}),
      completed: false,
    }, ...current])
    setFilter('all')
    return true
  }

  function toggleTask(id: string) {
    setTasks((current) => current.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    ))
  }

  function deleteTask(id: string) {
    setTasks((current) => current.filter((task) => task.id !== id))
  }

  function clearCompleted() {
    setTasks((current) => current.filter((task) => !task.completed))
  }

  return {
    tasks,
    filteredTasks,
    filter,
    setFilter,
    activeCount,
    completedCount,
    addTask,
    toggleTask,
    deleteTask,
    clearCompleted,
  }
}
