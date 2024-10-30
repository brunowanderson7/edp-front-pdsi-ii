'use client'

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import React, { useState } from 'react'

interface InputFieldProps {
  typeInput: 'text' | 'email' | 'password'
  idData?: string
}

export const InputField = ({ typeInput, idData }: InputFieldProps) => {
  const [typePass, setTypePass] = useState<boolean>(typeInput === 'password')

  const toggleIcon = () => {
    setTypePass(!typePass)
  }

  return (
    <div className="relative w-full">
      <input
        id={idData}
        name={idData}
        autoComplete='on'
        type={
          typeInput === 'password'
            ? typePass
              ? 'password'
              : 'text'
            : typeInput
        }
        className="h-10 w-full border-text bg-slate-100 text-black rounded-sm px-2 focus:border-text focus:outline-none focus:ring-0"
      />
      {typeInput === 'password' ? (
        <span
          onClick={toggleIcon}
          className="absolute right-2 top-2 text-2xl text-primary hover:text-secondary"
        >
          {!typePass ? <AiFillEye /> : <AiFillEyeInvisible />}
        </span>
      ) : null}
    </div>
  )
}

export default InputField
