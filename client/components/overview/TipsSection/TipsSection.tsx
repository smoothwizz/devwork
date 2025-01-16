import React, { useEffect, useState } from 'react'
import SectionHeading from '../common/SectionHeading.component'
import { TIPS_LIST } from './constant'

const TipsSection = () => {
  const [isExpanded, setIsExpanded] = useState(true)
  const [currentTipIndex, setCurrentTipIndex] = useState(0)
  const [timeUntilChange, setTimeUntilChange] = useState(15) // 15 seconds
  const focusTips = TIPS_LIST

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeUntilChange((prevTime) => {
        if (prevTime <= 0) {
          // Change tip when time runs out
          setCurrentTipIndex((prevIndex) => (prevIndex + 1) % focusTips.length)
          return 15 // Reset timer to 15 seconds
        } else {
          return prevTime - 1
        }
      })
    }, 1000) // Update every second

    return () => clearInterval(intervalId)
  }, [focusTips.length])

  return (
    <section className="mt-8">
      <SectionHeading
        title="Tips"
        description={'Quick tips to supercharge your sessions.'}
        subHeading={
          '* Simple strategies to combat distractions, get more done, and feel accomplished.'
        }
        handleToggle={() => setIsExpanded(!isExpanded)}
      />
      {isExpanded && (
        <blockquote className="p-4 my-4 border-s-4 border-gray-300 bg-gray-50 dark:border-gray-500 dark:bg-gray-800">
          <p className="text-md">{focusTips[currentTipIndex]}</p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-2 font-mono">
            Next tip in: {timeUntilChange} seconds
          </p>
        </blockquote>
      )}
    </section>
  )
}

export default TipsSection
