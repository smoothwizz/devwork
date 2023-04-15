import React, { ReactNode } from 'react'

const ALERT_STYLE_TYPE_MAP = {
  error: 'bg-red-500 text-white',
  info: '',
  warning: 'bg-amber-200',
  success: 'bg-teal-200',
} as const

type AlertType = 'error' | 'info' | 'success' | 'warning'

interface Props {
  children: ReactNode
  style: AlertType
}

const Alert = ({ children, style }: Props) => {
  return (
    <div className={`my-4 p-4 ${ALERT_STYLE_TYPE_MAP[style]} flex`}>
      <span className="text-xs">{children}</span>
    </div>
  )
}

export default Alert
