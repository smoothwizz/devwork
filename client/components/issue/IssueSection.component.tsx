import React, { useEffect, useState } from 'react'
import service from '../../services/service'
import { boxStyles } from '../common/common'
import SectionHeading from '../journey/common/SectionHeading.component'
import Issue from './Issue.component'

const IssueSection = () => {
  const [issue, setDescription] = useState('')

  useEffect(() => {
    service.getDescription().then((results) => {
      if (!results) {
        return
      }

      setDescription(results)
    })
  }, [])

  function updateDescription(value: string) {
    setDescription(value)
    service.setDescription(value)
  }

  return (
    <section>
      <SectionHeading
        title="Issue"
        description="What are you trying to accomplish (feature/bugfix)"
        subHeading={'* You can always change the description later'}
      />
      <div className={`${boxStyles} relative z-0 min-h-full p-4`}>
        <Issue isEdit={true} value={issue} action={updateDescription} />
      </div>
    </section>
  )
}

export default IssueSection
