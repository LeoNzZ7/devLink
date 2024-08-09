import { FormEvent, useEffect, useState } from "react"
import { Header } from "../../components/Header"
import { InputComponent } from "../../components/InputComponent"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "../../services/firebaseConnection"
import { Button } from "../../components/Button"

export const Networks = () => {
    const [facebook, setFacebook] = useState("")
    const [instagram, setInstagram] = useState("");
    const [youtube, setYoutube] = useState("");


    async function handleRegister(e: FormEvent) {
        e.preventDefault();

        await setDoc(doc(db, "social", "link"), {
            facebook,
            instagram,
            youtube,
        }).then(() => {
            console.log("Link salvo com sucesso!")
            setFacebook("")
            setInstagram("")
            setYoutube("")
        }).catch((error) => {
            console.log("Erro: " + error)
        })
    }

    useEffect(() => {
        async function loadingLinks() {
            const docRef = doc(db, "social", "link");
            await getDoc(docRef).then((snapshot) => {
                if (snapshot.data !== undefined) {
                    setFacebook(snapshot.data()?.facebook)
                    setInstagram(snapshot.data()?.instagram)
                    setYoutube(snapshot.data()?.youtube)
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            })
        }

        loadingLinks()
    }, [])

    return (
        <div className="flex items-center flex-col min-h-screen pb-7 px-2" >
            <Header />
            <h1 className="text-white text-2xl font-bold mt-8 mb-4" >Minhas redes sociais</h1>

            <form className="flex flex-col max-w-xl w-full" onSubmit={handleRegister} >
                <label className="text-white font-medium my-2">Link do Facebook</label>
                <InputComponent
                    type="url"
                    placeholder="Digite a url do seu perfil do Facebook..."
                    value={facebook}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFacebook(e.target.value)}
                />
                <label className="text-white font-medium my-2">Link do Instagram</label>
                <InputComponent
                    type="url"
                    placeholder="Digite a url do seu perfil do Instagram.."
                    value={instagram}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInstagram(e.target.value)}
                />
                <label className="text-white font-medium my-2">Link do Youtube</label>
                <InputComponent
                    type="url"
                    placeholder="Digite a url do seu canal do Youtube..."
                    value={youtube}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setYoutube(e.target.value)}
                />
                <Button buttonText="Salvar links" buttonType="submit" />
            </form>
        </div>
    )
}