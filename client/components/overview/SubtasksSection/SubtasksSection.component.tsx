import SectionHeading from '@/components/overview/common/SectionHeading.component'
import SubtasksList from './SubtasksList'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  toggle: Dispatch<SetStateAction<boolean>>
}

const SubtasksSection = ({ toggle}: Props) => {
  const description = ` List smaller, actionable items that need to be completed to achieve the main task.`
  const subHeading =
    '* This helps in making progress on larger tasks more manageable and trackable.'

  return (
    <section className="mt-8">
      <SectionHeading
        title="Subtasks"
        description={description}
        subHeading={subHeading}
        handleToggle={toggle}
      />
      <div className={`min-h-full w-full`}>
        <SubtasksList />
      </div>
    </section>
  )
}

export default SubtasksSection
