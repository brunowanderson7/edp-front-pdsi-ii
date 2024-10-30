'use client'

import IndexButonsGenerate from "./IndexButonsGenerate";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { FormRATMP } from "./FromParts/FormRATM";
import { authMiddleware } from "@/utils/middleware";
import Routes from "@/utils/Routes";
import { GET_METERS_TO_TESTS } from "@/services/gets/meters-to-test";
import Loading from "../loading/loading";


type GetMeter = {
  csd: string
  customerName: string
  customerPresent: boolean
  deliveredBy: string
  entryObservations: string
  id: string
  instalation: string
  modelId: number
  note: string
  number: string
  scheduleId: number
  scheduledObservations: string
  storageLocation: string
  toi: string
}



export const ReportGenerate = () => {

  const [currentContainer, setCurrentContainer] = useState(0)
  const [loadingActive, setLoadingActive] = useState(true)
  const [token, setToken] = useState('')

  const [meters, setMeters] = useState<GetMeter[]>([])
  const [widthContainer, setWidthContainer] = useState(0)
  const [widthInnerContainer, setWidthInnerContainer] = useState(0)

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
    async function getMeters() {
      try {
        const metersData = await GET_METERS_TO_TESTS(token, 10)
        console.log(metersData.data)
        setMeters(metersData.data)

        setWidthContainer(100 * metersData.data.length)
        setWidthInnerContainer(100 / metersData.data.length)

        setLoadingActive(false)

      } catch (err) {
        console.log(err)
      }
    }

    if (token) {
      getMeters()
    }
  }, [token])

  

  const handleButtonClick = (containerNumber: number) => {
    setCurrentContainer(containerNumber);
  };


  return (
    <div className="w-full h-full fixed flex flex-grow flex-col gap-3 overflow-x-hidden">
      <div className="w-full flex flex-grow items-start justify-center">

        {loadingActive ? (
          <Loading active={loadingActive} />
        ) : (
          <div className="flex flex-col w-[100%] relative">
            <div className="w-full fixed flex justify-evenly px-3 pb-3 gap-2 bg-background z-50 left-0 right-0">
              <IndexButonsGenerate generate={
                meters.map((data, index) => (
                  { onClick: () => handleButtonClick(index) }
                ))
              } />
            </div>
            <div
              style={{
                width: `${widthContainer}%`,
                transition: 'transform 0.5s ease',
                transform: `translateX(-${(currentContainer) * widthInnerContainer}%)`, // Mover o container para a parte correta
              }}

              className="flex flex-grow"
            >
              {meters.map((data, index) => (
                <div
                  key={index}
                  style={{ 
                    width: `${widthInnerContainer}%`
                  }}

                  className="flex flex-grow flex-col items-center justify-center py-4 mt-10 bg-secondary/20"
                >
                  <FormRATMP prefix={data.id} token={token} fieldAgent={data.deliveredBy} fieldsObservations={data.entryObservations} meterId={data.number} />
                  
                </div>
              ))}

            </div>
            
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportGenerate;
