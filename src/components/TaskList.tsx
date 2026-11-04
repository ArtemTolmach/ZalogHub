import { useI18n, type TranslationKey } from '../i18n'
import type { Task, TaskFilter } from '../types/task'
import styles from './TaskList.module.scss'

const EMPTY_STATE_KEYS: Record<TaskFilter, TranslationKey> = {
  all: 'noTasks',
  active: 'noActiveTasks',
  completed: 'noCompletedTasks',
}

type TaskListProps = {
  tasks: Task[]
  filter: TaskFilter
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TaskList({ tasks, filter, onToggle, onDelete }: TaskListProps) {
  const { t } = useI18n()

  if (tasks.length === 0) {
    return (
      <div className={styles.emptyState} aria-live="polite">
        <p>{t(EMPTY_STATE_KEYS[filter])}</p>
      </div>
    )
  }

  return (
    <ul className={styles.list}>
      {tasks.map((task) => (
        <li className={`${styles.row} ${task.completed ? styles.completed : ''}`} key={task.id}>
          <button
            className={styles.checkButton}
            type="button"
            aria-label={t(task.completed ? 'markActive' : 'markCompleted', { task: task.text })}
            aria-pressed={task.completed}
            onClick={() => onToggle(task.id)}
          >
            {task.completed && (
              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="m3.5 8.2 3 3 6-6.2" />
              </svg>
            )}
          </button>
          <div className={styles.content}>
            <span className={styles.text}>{task.text}</span>
            {task.description && <span className={styles.description}>{task.description}</span>}
          </div>
          <button
            className={styles.deleteButton}
            type="button"
            aria-label={t('deleteTask', { task: task.text })}
            onClick={() => onDelete(task.id)}
          >
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M4.5 6h11M8 6V4.5h4V6m2.5 0-.7 9.5H6.2L5.5 6m3 3v4m3-4v4" />
            </svg>
          </button>
        </li>
      ))}
    </ul>
  )
}
