'use client'

import { MenuItem } from '@/components/itens/itens'
import MenuUser from '@/utils/MenuUser'
import Navbar from '@/components/navbar/navbar'
import Routes from '@/utils/Routes'
import Loading from '@/components/loading/loading'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { authMiddleware } from '@/utils/middleware'
import { useAuth } from '@/hooks/authProvider'

interface dataProps {
  title: string,
  href: string,
  icon: JSX.Element,
}

export default function Menu() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [dataMenu, setDataMenu] = useState<dataProps[]>([])
  const [loadingActive, setLoadingActive] = useState(true);

  const { token, loading } = useAuth();

  useEffect(() => {
    if (loading) {
      return;
    }

    if (token) {
      if (authMiddleware(token)) {
        setName(localStorage.getItem('name') || '');
      } else {
        router.push(Routes.login);
      }
    } else {
      router.push(Routes.login);
    }
  }, [token, loading, router]);

  useEffect(() => {
    if (loading || !token) {
      return;
    }

    function fetchData() {
      const menuData = MenuUser(token) || [];
      setDataMenu(menuData);
      setLoadingActive(false);
    }

    fetchData();
  }, [token, loading]);

  return (
    <main className="flex flex-col min-h-screen w-full items-center justify-start bg-background">
      <Loading active={loadingActive} />
      <Navbar title={`Olá, ${name}`} menu={true} />
      <section className='w-full min-h-max flex p-3'>
        <div className='w-full grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 items-center justify-around bg-primary/10 py-5 gap-5 rounded-xl'>
          {dataMenu.map((item, index) => (
            <MenuItem key={index} title={item.title} href={item.href}>{item.icon}</MenuItem>
          ))}
        </div>
      </section>
    </main>
  )
}
