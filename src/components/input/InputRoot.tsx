import React, { ReactNode } from 'react'

interface InputRootProps {
  children: ReactNode
  wfull?: boolean
}

export const InputRoot = ({ children, wfull = false }: InputRootProps) => {
  return (
    <div className={`${wfull ? 'w-full' : 'w-80 '} flex flex-col items-start justify-start`}>{children}</div>
  )
}

export default InputRoot
