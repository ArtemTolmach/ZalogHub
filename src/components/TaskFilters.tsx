import { TASK_FILTERS } from '../constants/tasks'
import { useI18n } from '../i18n'
import type { TaskFilter } from '../types/task'
import styles from './TaskFilters.module.scss'

type TaskFiltersProps = {
  activeFilter: TaskFilter
  activeCount: number
  completedCount: number
  totalCount: number
  onChange: (filter: TaskFilter) => void
}

export function TaskFilters({ activeFilter, activeCount, completedCount, totalCount, onChange }: TaskFiltersProps) {
  const { t } = useI18n()
  const counts: Record<TaskFilter, number> = {
    all: totalCount,
    active: activeCount,
    completed: completedCount,
  }

  return (
    <div className={styles.tabs} role="group" aria-label={t('filters')}>
      {TASK_FILTERS.map((value) => (
        <button
          key={value}
          type="button"
          aria-pressed={activeFilter === value}
          className={`${styles.tab} ${activeFilter === value ? styles.selected : ''}`}
          onClick={() => onChange(value)}
        >
          {t(value)}
          <span className={styles.count}>{counts[value]}</span>
        </button>
      ))}
    </div>
  )
}
