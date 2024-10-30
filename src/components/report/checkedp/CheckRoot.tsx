import React, { ReactNode } from 'react'

interface CheckRootProps {
  children: ReactNode
  type: 'row' | 'column'
}

const CheckRoot = ({ children, type }: CheckRootProps) => {
  return (
    <div className={`flex ${type === 'column' ? 'flex-col' : 'flex-row gap-4'} items-start justify-start w-full`}>{children}</div>
  )
}

export default CheckRoot