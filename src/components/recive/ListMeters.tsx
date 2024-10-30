import { useRouter } from "next/navigation"

import Routes from "@/utils/Routes"


interface ListMetersProps {
  meterNumber: string
  meterStatus: string
  meterId: string
}

export const ListMeters = ({meterNumber, meterStatus, meterId}: ListMetersProps) => {
  const router = useRouter()

  return (
    <div className='w-full flex'>
      <div onClick={() => {router.push(Routes.receiveStatus(meterId))}} className={'w-full flex items-start p-4 gap-3 bg-secondary/30 cursor pointer hover:scale-[101%]'}>
        <h3>Número: {meterNumber}</h3>
        <h3>Status: {meterStatus}</h3>
      </div>
    </div>
  )
}