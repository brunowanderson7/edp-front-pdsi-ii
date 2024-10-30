'use client'

import { useRouter } from 'next/navigation'
import { MenuItem, ApproveItem } from '@/components/itens/itens'
import Routes from '@/utils/Routes'

import { BiArrowBack } from 'react-icons/bi'
import Navbar from '@/components/navbar/navbar'
import { useEffect, useState } from 'react'
import Loading from '@/components/loading/loading'
import { authMiddleware } from '@/utils/middleware'
import { GET_UNAPPROVED_USER } from '@/services/admin/getUsers'



interface dataProps {
  id: string,
  name: string,
  email: string,
}


export default function Approve() {
  
  const [token, setToken] = useState('')
  const [data, setData] = useState<dataProps[]>([])
  const [loadingActive, setLoadingActive] = useState(true);

  const router = useRouter()

  useEffect(() => {
    function auth() {
      const jwtToken = localStorage.getItem('token') || '';
  
      if (authMiddleware(jwtToken)) {
        setToken(jwtToken);
      } else {
        router.push(Routes.login);
      }
    }
  
    if (!token) {
      auth();
    }
  }, [])

  useEffect(() => {
    async function getData() {
      console.log(token)
      const res = await GET_UNAPPROVED_USER(token)
      console.log(res)
      setData(res)
      setLoadingActive(false)
    }
    if (token !== '') {
      getData()
    }
  }, [token])




  return (
    <main className="flex flex-col min-h-screen w-full items-center justify-start bg-background">
      <Loading active={loadingActive} />
      <Navbar title='Aprovar Usuários' />
      <section className='w-full min-h-max flex flex-col items-start justify-start p-3'>
        <MenuItem title='Voltar' href={Routes.menu} ><BiArrowBack /></MenuItem>
        <div className='w-full flex flex-col items-center justify-center py-5 gap-5 rounded-xl'>
          {data.map((item, index) => (
            <ApproveItem key={index} name={item.name} email={item.email} id={item.id} />
          ))}
        </div>
      </section>
    </main>
  )
}
