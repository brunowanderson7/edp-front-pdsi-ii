import { USER_LOGOUT } from "@/services/auth/logout"
import { HiLogout } from "react-icons/hi"
import { CgMenuGridR } from "react-icons/cg"

import Routes from "@/utils/Routes"


interface NavbarProps {
  title: string
  menu?: boolean
}


export const Navbar = ({ title, menu }: NavbarProps) => {

  return (
    <nav className="h-[80px] px-5 w-full flex bg-primary items-center justify-between lg:h[108px]">
      <div className="flex justify-start items-center gap-3">
        {!menu && (
          <a href={Routes.menu} className="text-white text-4xl hover:scale-105">
            <CgMenuGridR />
          </a>
        )}
        <div className='flex flex-col'>
          <h1 className="text-xl font-medium text-text ">{title}</h1>
          {menu && <h1 className="text-[10px] font-normal text-text ">Bem Vindo!</h1>}
        </div>
      </div>
      <button onClick={USER_LOGOUT} className="hover:text-accent"><HiLogout className="text-text text-2xl" /></button>
    </nav>
  )
}
export default Navbar