import { Link, useNavigate } from "react-router-dom"
import { InputComponent } from "../../components/InputComponent"
import { FormEvent, useContext, useState } from "react"
import { auth } from "../../services/firebaseConnection"
import { signInWithEmailAndPassword } from "firebase/auth"
import { Button } from "../../components/Button"
//import { UserContext } from "../../contexts/UserContext"
import { toast } from "react-toastify"
import { UserContext } from "../../contexts/UserContext"

export const SingIn = () => {
    const [userEmail, setUserEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const { id, setId, setEmail } = useContext(UserContext);

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        if (userEmail === "" && password === "") {
            toast.info("Por favor, Preencha todos os campos")
            return;
        }
        await signInWithEmailAndPassword(auth, userEmail, password)
            .then(() => {
                if (auth.currentUser && auth.currentUser.uid !== null && auth.currentUser.email !== null) {
                    setId(auth.currentUser.uid)
                    setEmail(auth.currentUser.email)
                    setUserEmail("")
                    setPassword("")
                    navigate(`/admin`, { replace: true })
                }
            }).catch((error) => {
                switch (error.code) {
                    case "auth/invalid-credential":
                        toast.error("Credenciais inválidas");
                        break;
                    case "auth/user-not-found":
                        toast.error("Usuário não encontrado");
                        break;
                    case "auth/wrong-password":
                        toast.error("Senha incorreta");
                        break;
                    case "auth/email-already-in-use":
                        toast.error("Este email já está em uso");
                        break;
                    case "auth/weak-password":
                        toast.error("A senha é muito fraca");
                        break;
                    case "auth/network-request-failed":
                        toast.error("Falha na conexão de rede");
                        break;
                    default:
                        toast.error("Erro de autenticação: " + error.message);
                }
            })
    }

    return (
        <div className="flex w-full h-screen items-center justify-center flex-col" >
            <Link to={id === "" ? "/" : `/${id}`} >
                <h1 className="m-11 mb-7 text-white font-bold text-5xl" >Dev
                    <span className="bg-gradient-to-r from-yellow-500 to-orange-400 bg-clip-text text-transparent" >
                        Link
                    </span>
                </h1>
            </Link>
            <form onSubmit={handleSubmit} className="w-full max-w-xl flex flex-col px-2  mb-5" >
                <InputComponent
                    type="email"
                    placeholder="Digite seu email"
                    value={userEmail}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserEmail(e.target.value)}
                />
                <InputComponent
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />

                <Button buttonType="submit" buttonText="Acessar" />
            </form>
            <Link to="/singUp">
                <p className="text-white" >Ainda não tem uma conta? <span className="text-blue-800 underline" >clique aqui</span></p>
            </Link>
        </div>
    )
}