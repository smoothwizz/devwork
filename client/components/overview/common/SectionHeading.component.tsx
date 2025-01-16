import ButtonIcon from '@/components/forms/buttons/ButtonIcon'
import React from 'react'

interface Props {
  title: string
  description: string
  subHeading?: string
  handleToggle: any
}

const SectionHeading = ({
  title,
  description,
  subHeading,
  handleToggle,
}: Props) => {
  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold mt-3 mb-3 flex items-start gap-1 cursor-pointer">
        {title} <ButtonIcon variant="close" action={() => handleToggle()}/>
      </h2>
      <p className="my-5 mx-auto text-xl">{description}</p>
      {subHeading && (
        <p className="text-xs text-gray-500 -mt-4 mb-4 dark:text-gray-400">
          {subHeading}
        </p>
      )}
    </div>
  )
}

export default SectionHeading
