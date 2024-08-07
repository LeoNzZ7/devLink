import { InputHTMLAttributes, useState } from "react"
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> { }

export const Input = (props: InputProps) => {
    const [showPassword, setShowPassword] = useState(false);

    if (props.type === "password") {
        return (
            <div className="relative" onSubmit={() => setShowPassword(false)}>
                <input
                    className="border-0 h-9 rounded-md outline-none px-2 mb-3 w-full"
                    {...props}
                    type={showPassword ? "text" : "password"}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-0 p-2 h-9 text-black bg-transparent rounded-r outline-none"
                >
                    {showPassword ? <IoEyeSharp /> : <FaEyeSlash />}
                </button>
            </div >
        )
    }

    return (
        <input
            className="border-0 h-9 rounded-md outline-none px-2 mb-3 w-full"
            {...props}
        />
    )
}