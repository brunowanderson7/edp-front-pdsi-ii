interface CheckLabelProps {
  title: string
}

const CheckLabel = ({title}: CheckLabelProps) => {
  return (
    <h1 className="text-[16px] font-medium text-text">{title}</h1>
  )
}
export default CheckLabel