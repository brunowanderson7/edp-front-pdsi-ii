'use client'


import api from "@/lib/api"
import { FormEvent, useState, useEffect } from 'react'
import { FaUpload } from 'react-icons/fa'

interface UpImageProps {
  id: string;

  token: string;
  updatePath: (path: string) => void;
  start: boolean;
}

export const UpImage = ({ id, token, updatePath, start }: UpImageProps) => {
  const [selectedFile, setSelectedFile] = useState('')
  const [archivo, setArchivo] = useState<File | null>(null)

  useEffect(() => {
    if (start) {
      handleUpload()
    }
  }, [start])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputElement = e.target as HTMLInputElement
    const fileList = inputElement.files

    if (fileList && fileList.length > 0) {
      const fileName = fileList[0].name
      setArchivo(fileList[0])
      setSelectedFile(fileName)
    }
  }

  const handleUpload = async () => {
    if (!archivo) {
      updatePath('void')
      return
    } else {
      console.log(archivo)

      const formData = new FormData()
      formData.append('file', archivo)

      try {
        const imgPath = await api.post('/uploads', formData, { headers: { Authorization: `Bearer ${token}` }})
        updatePath(imgPath.data.data)
        console.log(imgPath)
      } catch (error) {
        updatePath('error')
        console.log(error)
      }
    }
  }

  return (
    <div className={`${selectedFile ? 'w-full' : 'w-[96%]'} mx-auto hover:w-full transition-all duration-100`}>
      <label
        htmlFor={`cut-image-${id}`} // Use o ID passado como parte do ID do input
        className={`${selectedFile ? 'bg-green-500' : 'bg-orange-400'}  cursor-pointer bg-primary-50 p-2 font-semi px-4 flex items-center justify-start gap-3`}
      >
        <FaUpload />
        {selectedFile ? <p>{selectedFile}</p> : 'Selecione uma imagem'}
      </label>
      <input
        id={`cut-image-${id}`} // Use o ID passado como parte do ID do input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  )
}