import { Link, useNavigate } from "react-router-dom"
import { Input } from "../../components/Input"
import { FormEvent, useState } from "react"
import { auth } from "../../services/firebaseConnection"
import { signInWithEmailAndPassword } from "firebase/auth"
import { Button } from "../../components/Button"

export const SingIn = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        if (email === "" && password === "") {
            return;
        }
        await signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigate("/admin", { replace: true })
            }).catch((error) => {
                console.log("ERRO: " + error)
            })
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />

                <Button buttonType="submit" buttonText="Acessar" />
            </form>
        </div>
    )
}