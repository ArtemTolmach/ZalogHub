export type Task = {
  id: string
  text: string
  description?: string
  completed: boolean
}

export type TaskFilter = 'all' | 'active' | 'completed'
