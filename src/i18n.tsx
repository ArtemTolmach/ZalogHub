import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Language = 'ru' | 'en'

const russian = {
  appTitle: 'Задачи',
  pageDescription: 'Простой список задач, который помогает сосредоточиться на важном.',
  taskList: 'Список задач',
  newTask: 'Новая задача',
  descriptionLabel: 'Описание задачи',
  descriptionPlaceholder: 'Краткое описание (необязательно)',
  add: 'Добавить',
  filters: 'Фильтр задач',
  all: 'Все',
  active: 'Активные',
  completed: 'Выполненные',
  deleteCompleted: 'Удалить выполненные',
  noTasks: 'Нет задач',
  noActiveTasks: 'Нет активных задач',
  noCompletedTasks: 'Нет выполненных задач',
  switchLanguage: 'Переключить язык на английский',
  markActive: 'Отметить «{{task}}» как активную',
  markCompleted: 'Отметить «{{task}}» как выполненную',
  deleteTask: 'Удалить задачу «{{task}}»',
}

export type TranslationKey = keyof typeof russian

const translations = {
  ru: russian,
  en: {
    appTitle: 'Tasks',
    pageDescription: 'A simple task list that helps you focus on what matters.',
    taskList: 'Task list',
    newTask: 'New task',
    descriptionLabel: 'Task description',
    descriptionPlaceholder: 'Brief description (optional)',
    add: 'Add',
    filters: 'Task filters',
    all: 'All',
    active: 'Active',
    completed: 'Completed',
    deleteCompleted: 'Clear completed',
    noTasks: 'No tasks',
    noActiveTasks: 'No active tasks',
    noCompletedTasks: 'No completed tasks',
    switchLanguage: 'Переключить язык на русский',
    markActive: 'Mark “{{task}}” as active',
    markCompleted: 'Mark “{{task}}” as completed',
    deleteTask: 'Delete task “{{task}}”',
  },
} satisfies Record<Language, Record<TranslationKey, string>>

type I18nContextValue = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: TranslationKey, values?: Record<string, string>) => string
}

const LANGUAGE_STORAGE_KEY = 'zaloghub-todo-language'
const I18nContext = createContext<I18nContextValue | null>(null)

function getInitialLanguage(): Language {
  const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY)
  if (savedLanguage === 'ru' || savedLanguage === 'en') return savedLanguage
  return navigator.language.toLowerCase().startsWith('ru') ? 'ru' : 'en'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(getInitialLanguage)

  useEffect(() => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
    document.documentElement.lang = language
  }, [language])

  const t = (key: TranslationKey, values: Record<string, string> = {}) =>
    Object.entries(values).reduce(
      (message, [name, value]) => message.replaceAll(`{{${name}}}`, value),
      translations[language][key],
    )

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) throw new Error('useI18n must be used within I18nProvider')
  return context
}
