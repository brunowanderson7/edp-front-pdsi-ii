interface InputLabelProps {
  title: string
}

export const InputLabel = ({ title }: InputLabelProps) => {
  return <h1 className="text-base font-medium text-text">{title}</h1>
}

export default InputLabel
