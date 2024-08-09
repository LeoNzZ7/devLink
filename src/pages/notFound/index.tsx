import { TbError404 } from "react-icons/tb"
import { Button } from "../../components/Button"
import { Link } from "react-router-dom"

export const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center text-white font-bold h-screen" >
            <TbError404 size={250} />
            <h1 className="text-5xl" >Página não encontrada</h1>
            <Link className="mt-10" to="/">
                <Button buttonType="button" buttonText="Retornar a página inicial" />
            </Link>
        </div>
    )
}