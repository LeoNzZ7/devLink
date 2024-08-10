import { BiLogOut } from "react-icons/bi"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../../services/firebaseConnection";
import { signOut } from "firebase/auth"
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

export const Header = () => {
    const navigate = useNavigate()

    const { id, setId } = useContext(UserContext)

    async function HandleLogout() {
        navigate(`/${id}`, { replace: true })
        setId("")
        await signOut(auth);
        toast.info("Desconectado")
    }

    return (
        <header className="w-full mt-4 px-1 flex justify-center" style={{ display: id === "" ? "none" : "flex" }}  >
            <nav className="w-3/6 bg-neutral-600 h-12 flex items-center justify-between rounded-md px-3" >
                <div className="flex gap-4 font-medium" >
                    <Link to={`/${id}`}>Home</Link>
                    <Link to={`/admin`}>Links</Link>
                    <Link to={`/admin/networks`}>Redes</Link>
                </div>

                <button onClick={HandleLogout} ><BiLogOut size={28} color="#FFF" /></button>
            </nav>
        </header >
    )
}