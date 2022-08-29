import React from 'react'
import * as icons from '@ant-design/icons'

interface DynamicIconProps {
  icon: string
}

export default function DynamicIcon({ icon }: DynamicIconProps) {
  const antIcon: {
    [key: string]: any
  } = icons
  return React.createElement(antIcon[icon])
}
