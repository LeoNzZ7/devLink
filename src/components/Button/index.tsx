interface ButtonProps {
    buttonText: string
    buttonType: "button" | "submit" | "reset"
}

export const Button = ({ buttonText, buttonType }: ButtonProps) => {
    return (
        <button type={buttonType} className="bg-blue-600 h-9 rounded border-0 text-lg font-medium text-white">
            {buttonText}
        </button>
    )
}