import React, { useState } from 'react'
import Alert from '../banners/Alert'
import { pagePadding } from '../common/common'
import ButtonIcon from '../forms/buttons/ButtonIcon'
import ButtonLink from '../forms/buttons/ButtonLink'
import TasksList from '../planning/tasks/TasksList'
import Seo from '../Seo'
import Timer from '../timer'
import Greeting from '../planning/greeting/Greeting.component'
import SnippetsSection from '../planning/snippets/SnippetsSection'
import { Provider, createStore } from 'jotai'
import IssueSection from '../planning/issue/IssueSection.component'
type Props = {
  handleReset: () => void
}
export const OVERVIEW_PAGE_TITLE = 'One Task - Dolooper'

const OverviewSection = ({ handleReset }: Props) => {
  const [isTimerMinimized, setIsTimerMinimized] = useState(false)
  const pageTitle = OVERVIEW_PAGE_TITLE
  const myStore = createStore()

  return (
    <Provider store={myStore}>
      <Seo title={pageTitle} />
      <section className={`${pagePadding}`}>
        <Greeting />
        {renderTaskDashboard()}
        {renderInfoMessages()}
      </section>
    </Provider>
  )

  function renderTaskDashboard() {
    return (
      <div className="my-4 md:md-0">
        <section className={`${timerPopStyles}`}>
          <h2
            className="font-bold flex justify-between cursor-pointer"
            onClick={() => toggleTimerWindow()}
          >
            <span>Timer</span>
            <ButtonIcon
              variant={isTimerMinimized ? 'maximize' : 'minimize'}
              action={() => toggleTimerWindow()}
            />
          </h2>
          {!isTimerMinimized && <Timer />}
        </section>

        <section>
          <IssueSection isOverview={true} />
        </section>

        <section className={boxStyles}>
          <TasksList area="overview" />
        </section>

        <SnippetsSection />
      </div>
    )
  }

  function toggleTimerWindow() {
    setIsTimerMinimized(!isTimerMinimized)
  }

  function renderInfoMessages() {
    return (
      <Alert style="info">
        {`Completed this task? `}
        <ButtonLink action={handleReset} text={'Start a new one'}></ButtonLink>
      </Alert>
    )
  }
}

export const boxStyles = `bg-white shadow-sm px-2 md:px-4 py-3 my-4 rounded-md
                   dark:bg-gray-600 dark:text-white dark:border-gray-600`
const timerPopStyles = `bg-amber-200 shadow-sm px-2 md:px-4 py-3 my-4 rounded-md
                        w-full sm:w-1/2 z-10 md:w-1/4 sm:fixed sm:right-4 sm:bottom-2
                        dark:bg-gray-800 dark:text-white dark:border-gray-600 sm:opacity-95`

export default OverviewSection
