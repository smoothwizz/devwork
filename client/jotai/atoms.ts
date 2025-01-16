import { atomWithStorage } from 'jotai/utils'
import { type Task } from '../types/types'
import { DEFAULT_TEMPLATES } from '@/components/overview/TemplateSection/templates'

export type Snippet = {
  id: string
  value: string
}

const KEYS = {
  filename: 'filename',
  description: 'description',
  snippets: 'snippets',
  subTasks: 'subtasks',
  notes: 'notes',
  userSettings: 'userSettings'
}

type USER_SETTINGS = {
  showSubtasks: boolean,
  showNotes: boolean,
  showSnippets: boolean,
  showTimer: boolean
}

export const atom_filename = atomWithStorage(KEYS.filename, 'task.md')
export const atom_snippets = atomWithStorage<Array<Snippet>>(KEYS.snippets, [])
export const atom_notes = atomWithStorage(KEYS.notes, '')
export const atom_description = atomWithStorage(
  KEYS.description,
  DEFAULT_TEMPLATES.blank.description,
)
export const atom_settings = atomWithStorage<USER_SETTINGS>(KEYS.userSettings, {
  showSubtasks: true,
  showNotes: true,
  showSnippets: false,
  showTimer: true,
})

export const atom_subTasks = atomWithStorage<Array<Task>>(KEYS.subTasks, [])
