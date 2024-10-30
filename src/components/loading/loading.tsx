import Image from 'next/image';

interface LoadingProps {
  active: boolean
}

export const Loading = ({active}: LoadingProps) => {

  if (!active) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-secondary/20 z-10">
      <Image src={'/logo.png'} alt="logo" width={75} height={75} className='animate-spin duration-1000' />
    </div>
  )
};
export default Loading;