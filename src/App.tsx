import { useEffect } from 'react'
import { TaskComposer } from './components/TaskComposer'
import { TaskFilters } from './components/TaskFilters'
import { TaskList } from './components/TaskList'
import { useTasks } from './hooks/useTasks'
import { useI18n } from './i18n'
import styles from './App.module.scss'

function App() {
  const { language, setLanguage, t } = useI18n()
  const {
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
  } = useTasks()

  const now = new Date()
  const today = new Intl.DateTimeFormat(language === 'ru' ? 'ru-RU' : 'en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(now)
  const shortToday = new Intl.DateTimeFormat(language === 'ru' ? 'ru-RU' : 'en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  }).format(now)

  useEffect(() => {
    document.title = `${t('appTitle')} — Tidy`
    document.querySelector('meta[name="description"]')?.setAttribute('content', t('pageDescription'))
  }, [t])

  return (
    <div className={styles.pageShell}>
      <header className={styles.topbar}>
        <h1 className={styles.brand}>
          <span className={styles.brandMark} aria-hidden="true">
            <svg viewBox="0 0 20 20" fill="none">
              <path d="m4.5 10.5 3.2 3.2 7.8-8" />
            </svg>
          </span>
          <span>{t('appTitle')}</span>
        </h1>
        <div className={styles.headerActions}>
          <time className={styles.dateLabel} dateTime={now.toISOString()}>
            <span className={styles.dateFull}>{today}</span>
            <span className={styles.dateCompact}>{shortToday}</span>
          </time>
          <button
            className={styles.languageButton}
            type="button"
            aria-label={t('switchLanguage')}
            onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')}
          >
            {language === 'ru' ? 'EN' : 'RU'}
          </button>
        </div>
      </header>

      <main className={styles.taskPanel} aria-label={t('taskList')}>
        <TaskComposer onAdd={addTask} />
        <div className={styles.listToolbar}>
          <TaskFilters
            activeFilter={filter}
            activeCount={activeCount}
            completedCount={completedCount}
            totalCount={tasks.length}
            onChange={setFilter}
          />
          {completedCount > 0 && (
            <button className={styles.textButton} type="button" onClick={clearCompleted}>
              {t('deleteCompleted')}
            </button>
          )}
        </div>
        <TaskList
          tasks={filteredTasks}
          filter={filter}
          onToggle={toggleTask}
          onDelete={deleteTask}
        />
      </main>
    </div>
  )
}

export default App
