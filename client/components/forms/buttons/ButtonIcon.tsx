import React from 'react'
import PenSVG from 'icons/PenSVG'
import DeleteSVG from 'icons/DeleteSVG'
import LogSVG from 'icons/LogSVG'
import ThreeDotsSVG from 'icons/ThreeDotsSVG'
import PlaySVG from 'icons/PlaySVG'
import PauseSVG from 'icons/PauseSVG'
import SettingsSVG from 'icons/SettingsSVG'
import MaximizeSVG from 'icons/MaximizeSVG'
import MinimizeSVG from 'icons/MinimizeSVG'
import { FaTimes } from 'react-icons/fa'

const ButtonIconVariants = {
  delete: <DeleteSVG />,
  edit: <PenSVG />,
  maximize: <MaximizeSVG />,
  minimize: <MinimizeSVG />,
  more: <ThreeDotsSVG />,
  log: <LogSVG />,
  play: <PlaySVG />,
  pause: <PauseSVG />,
  close: <FaTimes />,
  settings: <SettingsSVG />,
  unlock: <span title="Unlock Scroll">🔓</span>,
}

type VariantValues = keyof typeof ButtonIconVariants

interface Props {
  variant: VariantValues
  action: () => void
  isDisabled?: boolean
  style?: string
}

const ButtonIcon = ({ variant, action, isDisabled, style = '' }: Props) => {
  return (
    <button
      className={`${buttonStyles} ${style}`}
      data-mdb-ripple="true"
      data-mdb-ripple-color="light"
      onClick={action}
      role="button"
      disabled={isDisabled}
    >
      {ButtonIconVariants[variant]}
    </button>
  )
}

const buttonStyles = `ml-2 inline-block px-1 py-1.5 bg-gray-600 text-white font-medium text-xs
                        leading-tight uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg
                        focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800
                        active:shadow-lg transition duration-150 ease-in-out items-center whitespace-nowrap
                        dark:bg-amber-200 dark:hover:bg-amber-300 dark:focus:bg-amber-300 dark:text-gray-700`

export default ButtonIcon
