import { HiCalendar, HiUserAdd, HiUserRemove } from 'react-icons/hi';
import { BiCalendarPlus, BiSolidCalendarEdit } from 'react-icons/bi';
import { FaArchive, FaPlusCircle } from 'react-icons/fa';
import jwt from "jsonwebtoken";

import Routes from './Routes';
import { use } from 'react';
import { BsFillSaveFill } from 'react-icons/bs';




const itens = {
  approveAccess: {
    title: 'Aprovar',
    href: Routes.approve,
    icon: <HiUserAdd />
  },
  removeAccess: {
    title: 'Remover',
    href: '#',
    icon: <HiUserRemove />
  },
  date: {
    title: 'Datas',
    href: Routes.dates,
    icon: <BiCalendarPlus />
  },
  schedule: {
    title: 'Agendar',
    href: Routes.schedule,
    icon: <HiCalendar />
  },
  reschedule: {
    title: 'Reagendar',
    href: Routes.reschedule,
    icon: <BiSolidCalendarEdit />
  },
  model: {
    title: 'Modelos',
    href: Routes.addmodel,
    icon: <FaPlusCircle />
  },
  reports: {
    title: 'RATM',
    href: Routes.reports,
    icon: <FaArchive />
  },
  receive: {
    title: 'Receber',
    href: Routes.receive,
    icon: <BsFillSaveFill />
  },
  
}


interface userPermissionsProps {
  manager: boolean;
  date: boolean;
  schedule: boolean;
  reschedule: boolean;
  ratm: boolean;
  model: boolean;
  discard: boolean;
  consult: boolean;
}


export const MenuUser = (token: string) => {

  const decoded = jwt.decode(token)

  if (decoded) {
    const { userPermissions} = decoded as { userPermissions: userPermissionsProps };
    let data = []
    userPermissions.manager && data.push(itens.approveAccess) && data.push(itens.removeAccess)
    userPermissions.date && data.push(itens.date)
    userPermissions.schedule && data.push(itens.schedule)
    userPermissions.reschedule && data.push(itens.reschedule)
    userPermissions.model && data.push(itens.model)
    userPermissions.consult && data.push(itens.receive)
    userPermissions.ratm && data.push(itens.reports)

    return data
  }
  
};
export default MenuUser;
