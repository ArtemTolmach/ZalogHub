import { useState, type FormEvent } from 'react'
import { useI18n } from '../i18n'
import styles from './TaskComposer.module.scss'

type TaskComposerProps = {
  onAdd: (text: string, description: string) => boolean
}

export function TaskComposer({ onAdd }: TaskComposerProps) {
  const { t } = useI18n()
  const [value, setValue] = useState('')
  const [description, setDescription] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (onAdd(value, description)) {
      setValue('')
      setDescription('')
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.srOnly} htmlFor="new-task">{t('newTask')}</label>
      <input
        id="new-task"
        className={styles.titleInput}
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={t('newTask')}
        autoComplete="off"
      />
      <label className={styles.srOnly} htmlFor="task-description">{t('descriptionLabel')}</label>
      <input
        id="task-description"
        className={styles.descriptionInput}
        type="text"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder={t('descriptionPlaceholder')}
        autoComplete="off"
      />
      <button className={styles.addButton} type="submit" disabled={!value.trim()}>
        {t('add')}
      </button>
    </form>
  )
}
