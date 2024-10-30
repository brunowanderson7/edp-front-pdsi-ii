import React, { ReactNode } from 'react'

interface QuestionRootProps {
  children: ReactNode
}


export const QuestionRoot = ({children}: QuestionRootProps) => {

  return (
    <div className="w-full flex flex-col items-start justify-start bg-primary/10 md:border border-white/20 p-2 gap-4">
      {children}
    </div>
  )
}

