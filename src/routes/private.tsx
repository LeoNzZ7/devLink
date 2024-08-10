import { onAuthStateChanged } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { auth } from "../services/firebaseConnection";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { UserContext } from "../contexts/UserContext";

interface PrivateProps {
    children: React.ReactElement
}

export const Private = ({ children }: PrivateProps) => {
    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);

    const { setId, setEmail } = useContext(UserContext)
    useEffect(() => {
        const unSub = onAuthStateChanged(auth, (user) => {
            if (user) {
                const userData = {
                    uid: user.uid,
                    email: user.email,
                }

                setEmail(user.email as string)
                setId(user.uid as string)

                localStorage.setItem('@devlink', JSON.stringify(userData));

                setLoading(false);
                setSigned(true);
            } else {
                setLoading(false);
                setSigned(false);
                setId("")
                setEmail("")
            }
        })

        return () => {
            unSub();
        }
    }, [])

    if (loading) {
        return <LoadingSpinner />
    }

    if (!signed) {
        return <Navigate to="/singIn" replace={true} />
    }

    return children;
}