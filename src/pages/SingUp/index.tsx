import { Link, useNavigate } from "react-router-dom"
import { InputComponent } from "../../components/InputComponent"
import { Button } from "../../components/Button"
import { FormEvent, useContext, useState } from "react"
import { auth, db } from "../../services/firebaseConnection"
import { toast } from "react-toastify"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { UserContext } from "../../contexts/UserContext"
import { FirebaseError } from "firebase/app"
import { doc, setDoc } from "firebase/firestore"

export const SingUp = () => {
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const navigate = useNavigate()

    const { id, setId } = useContext(UserContext)

    async function handleCreateUser(e: FormEvent) {
        e.preventDefault()

        if (userName && email && password && confirmPassword) {
            if (password === confirmPassword) {
                try {
                    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                    const user = userCredential.user;
                    await setDoc(doc(db, "usersInfo", user.uid), {
                        userName
                    })
                    setId(user?.uid)
                    toast.success("Conta criada com sucesso!");
                    navigate(`/${user?.uid}`, { replace: true });
                } catch (error) {
                    if (error instanceof FirebaseError) {
                        if (error.code === 'auth/email-already-in-use') {
                            toast.error("Este email já está em uso.");
                        } else if (error.code === 'auth/weak-password') {
                            toast.error("A senha é muito fraca.");
                        } else {
                            toast.error(`Erro ao criar conta: ${error.message}`);
                        }
                    } else {
                        toast.error("Erro desconhecido ao criar conta. Tente novamente.");
                    }
                }
            } else {
                toast.error("As senhas não coincidem");
            }
        } else {
            toast.error("Por favor, preencha todos os campos.");
        }
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
            <form onSubmit={handleCreateUser} className="w-full max-w-xl flex flex-col px-2 mb-5" >
                <InputComponent
                    type="text"
                    placeholder="Digite seu nome completo ou como você é conhecido"
                    value={userName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserName(e.target.value)}
                />
                <InputComponent
                    type="email"
                    placeholder="Digite seu email"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
                <InputComponent
                    type="password"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                />
                <InputComponent
                    type="password"
                    placeholder="Confirme sua senha"
                    value={confirmPassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                />

                <Button buttonType="submit" buttonText="Criar Conta" />
            </form>
            <Link to="/singIn">
                <p className="text-white" >Já tem uma conta? <span className="text-blue-800 underline" >clique aqui</span></p>
            </Link>
        </div >
    )
}