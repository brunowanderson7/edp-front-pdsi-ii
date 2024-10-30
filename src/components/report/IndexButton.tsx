interface IndexButtonProps {
  onClick: () => void

  title: number
  state: number
}

export const IndexButton = ({onClick, title, state}: IndexButtonProps) => {

  return (
    <button
      onClick={onClick}
      className={`${state === title ? 'bg-primary' : 'bg-secondary'} w-full py-2 text-white text-base`}
    >
      {title + 1}
    </button>
  )
}
export default IndexButton