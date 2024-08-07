import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../services/firebaseConnection";
import { Navigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

interface PrivateProps {
    children: React.ReactElement
}

export const Private = ({ children }: PrivateProps) => {
    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);

    useEffect(() => {
        const unSub = onAuthStateChanged(auth, (user) => {
            if (user) {
                const userData = {
                    uid: user.uid,
                    email: user.email,
                }

                localStorage.setItem('@devlink', JSON.stringify(userData));
                setLoading(false);
                setSigned(true);
            } else {
                setLoading(false);
                setSigned(false);
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

        return <Navigate to="/login" />

    }

    return children;
}