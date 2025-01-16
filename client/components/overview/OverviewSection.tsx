'use client'

import React, { useEffect, useState } from 'react'
import { pagePadding } from '../common/common'
import ConfettiExplosion from 'react-confetti-explosion'

import { Provider, createStore, useAtom } from 'jotai'

import ButtonLink from '../forms/buttons/ButtonLink'
import Alert from '../banners/Alert'
import Seo from '../Seo'
import SnippetsSection from './SnippetsSection/SnippetsSection'
import Timer from '../timer'
import MarkdownPreview from './MarkdownPreview'
import TaskDetails from './TaskDetails'
import SubtasksSection from './SubtasksSection'
import Greeting from '../common/Greeting'
import TemplateSection from './TemplateSection'
import { atom_description, atom_filename, atom_settings } from 'jotai/atoms'
import {
  DEFAULT_TEMPLATES,
  TEMPLATES_WITH_DATES,
} from './TemplateSection/templates'
import { TemplateVariant } from './TemplateSection/TemplateSection.component'
import { getCurrentDate } from 'utils/functions'
import ButtonCircle from '../forms/buttons/ButtonCircle'
import {
  FaCog,
  FaExpand,
  FaEye,
  FaEyeSlash,
  FaFile,
  FaTimes,
} from 'react-icons/fa'
import OpenFileSection from './OpenFileSection'
import ButtonFontIcon from '../forms/buttons/ButtonFontIcon'
import SaveFileSection from './SaveFileSection'
import TitleField from './TitleField/TitleField'
import FullscreenModal from '../common/FullscreenModal'
import NotesSection from './NotesSection'
import CodeEditorSection from './CodeEditorSection'

type Props = {
  handleReset: () => void
}

export const OVERVIEW_PAGE_TITLE = 'Dolooper - Dashboard'

const OverviewSection = ({ handleReset }: Props) => {
  const CONFETTI_TIMER = 5000
  const pageTitle = OVERVIEW_PAGE_TITLE
  const myStore = createStore()
  const [isMounted, setIsMounted] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [isPreview, setIsPreview] = useState(false)
  const [isUserSettingsMenuExpanded, setIsUserSettingsMenuExtended] =
    useState(false)
  const [userSettings, setUserSettings] = useAtom(atom_settings)

  const toggleNotes = () => {
    setUserSettings({ ...userSettings, showNotes: !userSettings.showNotes })
  }

  const toggleCodeEditor = () => {
    setUserSettings({
      ...userSettings,
      showCodeEditor: !userSettings.showCodeEditor,
    })
  }

  const toggleSnippets = () => {
    setUserSettings({
      ...userSettings,
      showSnippets: !userSettings.showSnippets,
    })
  }

  const toggleSubtasks = () => {
    setUserSettings({
      ...userSettings,
      showSubtasks: !userSettings.showSubtasks,
    })
  }

  const toggleTimer = () => {
    setUserSettings({ ...userSettings, showTimer: !userSettings.showTimer })
  }

  const [, setFilename] = useAtom(atom_filename)
  const [, setDescription] = useAtom(atom_description)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <></>
  }

  return (
    <Provider store={myStore}>
      <Seo title={pageTitle} />
      <section className={`${pagePadding} pb-16`}>
        <div className="flex justify-between flex-wrap">
          <Greeting />
          {renderSectionToggles()}
        </div>
        <div className={`${showConfetti && 'opacity-30'}`}>
          {renderTaskDashboard()}
        </div>
      </section>
    </Provider>
  )

  function loadTemplate(variant: TemplateVariant) {
    let description = DEFAULT_TEMPLATES[variant].description
    let title = DEFAULT_TEMPLATES[variant]?.filename || 'task'

    if (TEMPLATES_WITH_DATES.includes(variant)) {
      description = description.replace('dd.mm.yyyy', getCurrentDate())
    }
    setFilename(title)
    setDescription(description)
  }

  function renderTask(isFocused: boolean) {
    return (
      <>
        {renderDashboardNav()}
        {!isPreview && !isFocused && <TitleField />}
        {!isPreview && <TaskDetails isFocused={isFocused || false} />}
        {isPreview && <MarkdownPreview />}
      </>
    )
  }

  function renderTaskDashboard() {
    return (
      <div className="my-4 md:md-0">
        <div>
          <div className="w-full">
            <h2 className="text-3xl font-bold mt-3 mb-3">
              Ready for a focused session?
            </h2>
            <>
              <p className="my-5 mx-auto text-xl">Define your task.</p>
              <p className="text-xs text-gray-500 -mt-4 mb-4 dark:text-gray-400">
                <ButtonLink action={handleTutorialStart()}>
                  Need help getting started?
                </ButtonLink>
              </p>
            </>
          </div>

          {isFocused && (
            <FullscreenModal
              title="Focus"
              isOpen={isFocused}
              onModalClose={() => setIsFocused(false)}
            >
              {renderTask(isFocused)}
            </FullscreenModal>
          )}

          {!isFocused && renderTask(isFocused)}
        </div>
        {renderInfoMessages()}
        {!isFocused && userSettings.showTimer && <Timer />}
        {userSettings.showSubtasks && (
          <SubtasksSection toggle={toggleSubtasks} />
        )}
        {userSettings.showNotes && <NotesSection toggle={toggleNotes} />}
        {userSettings.showCodeEditor && (
          <CodeEditorSection toggle={toggleCodeEditor} />
        )}
        {userSettings.showSnippets && (
          <SnippetsSection toggle={toggleSnippets} />
        )}
      </div>
    )
  }

  function renderSectionToggles(): React.ReactNode {
    return (
      <div className="mt-2 text-blue-700 bg-white dark:bg-gray-600 dark:text-blue-300 px-4 py-2 items-center flex gap-2">
        <ButtonLink
          showAsLink={false}
          action={() =>
            setIsUserSettingsMenuExtended(!isUserSettingsMenuExpanded)
          }
        >
          <FaCog />
        </ButtonLink>
        {isUserSettingsMenuExpanded && (
          <>
            <ButtonLink
              showAsLink={false}
              action={toggleSubtasks}
              style="text-xs"
            >
              <span>
                {userSettings.showSubtasks ? 'Hide' : 'Show'} Subtasks
              </span>
            </ButtonLink>

            <ButtonLink showAsLink={false} action={toggleNotes} style="text-xs">
              <span>{userSettings.showNotes ? 'Hide' : 'Show'} Notes</span>
            </ButtonLink>

            <ButtonLink
              showAsLink={false}
              action={toggleCodeEditor}
              style="text-xs"
            >
              <span>
                {userSettings.showCodeEditor ? 'Hide' : 'Show'} Code Editor
              </span>
            </ButtonLink>

            <ButtonLink
              showAsLink={false}
              action={toggleSnippets}
              style="text-xs"
            >
              <span>
                {userSettings.showSnippets ? 'Hide' : 'Show'} Snippets
              </span>
            </ButtonLink>

            <ButtonLink showAsLink={false} action={toggleTimer} style="text-xs">
              <span>{userSettings.showTimer ? 'Hide' : 'Show'} Timer</span>
            </ButtonLink>
          </>
        )}
      </div>
    )
  }

  function renderDashboardNav() {
    return (
      <div className="w-full flex gap-4 items-center justify-between">
        <div className="flex gap-2">
          <ButtonCircle
            action={() => {
              setIsFocused(!isFocused)
            }}
            title={isPreview ? 'Close' : 'Focus'}
          >
            {isFocused ? <FaTimes /> : <FaExpand />}
          </ButtonCircle>

          <ButtonCircle
            action={() => setIsPreview(!isPreview)}
            title={isPreview ? 'Edit' : 'Preview'}
          >
            {isPreview ? <FaEyeSlash /> : <FaEye />}
          </ButtonCircle>
        </div>
        <div className="flex ml-auto gap-2">
          <ButtonFontIcon
            title="New Task"
            action={() => {
              setDescription('')
              setIsPreview(false)
            }}
          >
            <FaFile />
          </ButtonFontIcon>
          <TemplateSection
            handleTemplateChange={(variant) => {
              loadTemplate(variant)
              setIsPreview(false)
            }}
          />
          <OpenFileSection
            handleFileLoad={(name, content) => {
              setFilename(name || 'task.md')
              setDescription(content)
              setIsPreview(false)
            }}
          />
          <SaveFileSection />
        </div>
      </div>
    )
  }

  function handleTutorialStart(): () => void {
    return () => {
      setIsPreview(true)
      loadTemplate('tutorial')
    }
  }

  function renderInfoMessages() {
    const confettiConfigProps = {
      force: 1.2,
      duration: CONFETTI_TIMER,
      particleCount: 250,
      width: 1600,
    }

    return (
      <section className="mt-4">
        <Alert style="info">
          {showConfetti
            ? 'Congratulations! Starting up a new one...'
            : `Completed this task? `}
          {!showConfetti && (
            <ButtonLink action={() => markTaskAsCompleted()}>
              Start a new one
            </ButtonLink>
          )}
          {showConfetti && <ConfettiExplosion {...confettiConfigProps} />}
        </Alert>
      </section>
    )
  }

  function markTaskAsCompleted() {
    setShowConfetti(true)
    setTimeout(() => {
      handleReset()
      setIsPreview(false)
      setShowConfetti(false)
    }, CONFETTI_TIMER - 1000)
  }
}

export default OverviewSection
