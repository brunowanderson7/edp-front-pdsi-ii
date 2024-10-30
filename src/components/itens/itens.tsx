'use client'

import React, { ReactNode, useEffect, useState } from "react";
import { BiCheck, BiX } from 'react-icons/bi'
import { Permisions } from "../permisions/permisions";
import Checkbox from "../checkbox/checkbox";
import Loading from "../loading/loading";
import './styles.css'
import { REJECT_USER } from "@/services/admin/rejectUser";


interface MenuItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode
  title: string
}

export const MenuItem = ({ children, title, ...props }: MenuItemProps) => {
  return (
    <a {...props} className='flex flex-col items-center justify-center'>
      <span className='flex items-center justify-center h-16 w-16 bg-primary rounded-full text-text text-4xl'>{children}</span>
      <h1 className="text-center">{title}</h1>
    </a>
  )
}


interface ApproveItemProps {
  name: string
  email: string
  id: string
}


export const ApproveItem = ({ name, email, id}: ApproveItemProps) => {

  const [loadingActive, setLoadingActive] = useState(false);
  const [modal, setModal] = useState<boolean>(false)
  const [token, setToken] = useState<string>('')
  useEffect(() => {
    if (token !== '') {
      return
    }
    setToken(localStorage.getItem('token') || '')
  }, []);

  const reject = async () => {
    setLoadingActive(true)
    const res = await REJECT_USER(id, token)
    if (res === 200) {
      alert('Usuário rejeitado com sucesso!')
      window.location.reload()
      setLoadingActive(false)
    }
  }

  const approve = () => {
    setModal(true)
  }

  return (
    <div className='w-full flex items-center justify-between bg-primary/10 p-5 rounded-xl'>
      <Loading active={loadingActive} />      

      {modal ? <Permisions name={name} id={id} token={token} action={() => setModal(!modal)} /> : <><div className='flex flex-col justify-start'>
        <h1 className='text-base'>{name}</h1>
        <h2 className='text-xs'>{email}</h2>
      </div>
      <div className='flex gap-2'>
        <button onClick={reject} className='w-7 h-7 flex items-center justify-center text-2xl rounded-full text-text bg-danger'><BiX /></button>
        <button onClick={approve} className='w-7 h-7 flex items-center justify-center text-2xl rounded-full text-text bg-success'><BiCheck /></button>
      </div></>}
    </div>
  )
}

interface PermisionItemProps {
  name: string
  id: string
}

export const PermisionItem = ({ name, id}: PermisionItemProps) => {

  return (
    <div className="w-full flex items-center justify-start p-2 border border-secondary">
      <Checkbox id={id} />
      <h1>{name}</h1>
    </div>
  )
}


interface CheckboxItemProps {
  idName: string
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const CheckboxItem = ({ idName, checked, onChange }: CheckboxItemProps) => {
  return (
    <label htmlFor={idName} className="checkbox-label">
      <input
        id={idName}
        name={idName}
        type="checkbox"
        defaultChecked={checked}
        onChange={onChange}
        className="hidden-checkbox"
        value={checked ? '1' : '0'}
      />
      <span className={`custom-checkbox ${checked ? 'checked' : ''}`} />
    </label>
  )
}