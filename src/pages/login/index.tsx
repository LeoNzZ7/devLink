import { Link } from "react-router-dom"
import { Input } from "../../components/input"
import { FormEvent, useState } from "react"

export const SingIn = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function handleSubmit(e: FormEvent) {
        e.preventDefault()

        console.log(email, password + " entrando...")
    }

    return (
        <div className="flex w-full h-screen items-center justify-center flex-col" >
            <Link to="/" >
                <h1 className="m-11 mb-7 text-white font-bold text-5xl" >Dev
                    <span className="bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent" >
                        Link
                    </span>
                </h1>
            </Link>
            <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col px-2" >
                <Input
                    type="email"
                    placeholder="Digite seu email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                <button
                    type="submit"
                    className="bg-blue-600 h-9 rounded border-0 text-lg font-medium text-white" >
                    Acessar
                </button>
            </form>
        </div>
    )
}