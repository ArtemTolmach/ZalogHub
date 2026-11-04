import { TASK_STORAGE_KEY } from '../constants/tasks'
import type { Task } from '../types/task'

function isTask(value: unknown): value is Task {
  if (typeof value !== 'object' || value === null) return false

  const task = value as Record<string, unknown>
  return typeof task.id === 'string' &&
    typeof task.text === 'string' &&
    (task.description === undefined || typeof task.description === 'string') &&
    typeof task.completed === 'boolean'
}

export function loadTasks(): Task[] {
  try {
    const storedValue = localStorage.getItem(TASK_STORAGE_KEY)
    if (!storedValue) return []

    const parsed: unknown = JSON.parse(storedValue)
    return Array.isArray(parsed) ? parsed.filter(isTask) : []
  } catch {
    return []
  }
}

export function saveTasks(tasks: Task[]) {
  try {
    localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasks))
  } catch {
  }
}
