interface ButtonProps {
    buttonText: string
    buttonType: "button" | "submit" | "reset"
    onClick?: () => void
}

export const Button = ({ buttonText, buttonType, onClick }: ButtonProps) => {
    return (
        <button onClick={onClick} type={buttonType} className="bg-blue-600 h-9 px-2 rounded border-0 text-lg font-medium text-white">
            {buttonText}
        </button>
    )
}