import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../services/firebaseConnection";

type UserContextData = {
    id: string;
    name: string;
    email: string;
    setId: (id: string) => void;
    setName: (name: string) => void;
    setEmail: (email: string) => void;
}

interface UserProviderProps {
    children: React.ReactNode
}

export const UserContext = createContext({} as UserContextData)

const UserProvider = ({ children }: UserProviderProps) => {
    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user && user.uid !== null && user.email !== null) {
                setId(user.uid)
                setEmail(user.email)
                setName(user.displayName || "")
            } else {
                // Usuário não está logado
                console.log('Usuário não está logado');
            }

            unsubscribe()
        })
    }, [])

    return (
        <UserContext.Provider value={{ id, setId, name, setName, email, setEmail }} >
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;