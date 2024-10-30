interface ButtonUIProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
  typeButton: 'default' | 'outline'
}

export const ButtonUI = ({ title, typeButton, ...props }: ButtonUIProps) => {
  return (
    <button
      {...props}
      className={`${
        typeButton === 'default'
          ? 'bg-primary'
          : 'border-2 border-text bg-transparent'
      } flex h-10 w-full items-center justify-center rounded-sm text-base font-medium text-text shadow-md hover:bg-secondary`}
    >
      {title}
    </button>
  )
}

export default ButtonUI
