import { FormEvent, useEffect, useState } from "react"
import { Header } from "../../components/Header"
import { InputComponent } from "../../components/InputComponent"
import { FiTrash } from "react-icons/fi"
import { db } from "../../services/firebaseConnection"
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query } from "firebase/firestore"
import { Button } from "../../components/Button"
import { LinkProps } from "../../types/links.types"

export const Admin = () => {
    const [nameInput, setNameInput] = useState("")
    const [urlInput, setUrlInput] = useState("")
    const [textColorInput, setTextColorInput] = useState("#FFFFFF")
    const [backgroundColorInput, setBackgroundColorInput] = useState("#00FF")

    const [links, setLinks] = useState<LinkProps[]>([])

    useEffect(() => {
        const linksRef = collection(db, "links")
        const queryRef = query(linksRef, orderBy("createdAt", "asc"));

        const unSub = onSnapshot(queryRef, (snapshot) => {
            const lista = [] as LinkProps[]

            snapshot.forEach((doc) => {
                lista.push({
                    id: doc.id,
                    url: doc.data().url,
                    name: doc.data().name,
                    textColor: doc.data().textColor,
                    createdAt: doc.data().createdAt.toDate().toLocaleString(),
                    backgroundColor: doc.data().backgroundColor,
                })
            });

            setLinks(lista)
        })

        return () => unSub();
    }, [])

    async function handleRegister(e: FormEvent) {
        e.preventDefault();

        if (nameInput === "" || urlInput === "") {
            alert("Preencha todos os campos")
            return;
        }

        await addDoc(collection(db, "links"), {
            name: nameInput,
            url: urlInput,
            textColor: textColorInput,
            backgroundColor: backgroundColorInput,
            createdAt: new Date()
        }).then(() => {
            console.log("Cadastrado com sucesso")
            setNameInput("")
            setUrlInput("")
        }).catch((error) => {
            console.log("Erro: " + error)
        })
    }

    async function handleDeleteLink(id: string) {
        const docRef = doc(db, "links", id)
        await deleteDoc(docRef).then(() => {
            console.log("deletado com sucesso")
        })
    }

    return (
        <div className="flex items-center flex-col min-h-screen pb-7 px-2" >
            <Header />
            <form className="flex flex-col mt-8 mb-3 w-full max-w-xl" onSubmit={handleRegister} >
                <label className="text-white font-medium my-2 ">Nome do link</label>
                <InputComponent
                    type="text"
                    placeholder="Digite o nome do link..."
                    value={nameInput}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNameInput(e.target.value)}
                />
                <InputComponent
                    type="url"
                    placeholder="Digite a url..."
                    value={urlInput}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUrlInput(e.target.value)}
                />
                <section className="flex my-4 gap-5" >
                    <div className="flex gap-2" >
                        <label className="text-white font-medium my-2">Cor do link</label>
                        <input
                            type="color"
                            value={textColorInput}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTextColorInput(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2" >
                        <label className="text-white font-medium my-2">Fundo do link</label>
                        <input
                            type="color"
                            value={backgroundColorInput}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBackgroundColorInput(e.target.value)}
                        />
                    </div>
                </section>

                {nameInput !== "" && (
                    <div className="flex items-center justify-center flex-col mb-7 p-1 border-gray-100/25 border rounded-md" >
                        <label className="text-white font-medium my-2 ">Veja como está ficando</label>
                        <article
                            className={`w-11/12 max-w-lg flex flex-col items-center justify-between rounded px-1 py-3`}
                            style={{ marginBottom: 8, marginTop: 8, backgroundColor: backgroundColorInput }}>
                            <p className="font-medium" style={{ color: textColorInput }}>{nameInput}</p>
                        </article>
                    </div>
                )}

                <Button buttonType="submit" buttonText="Cadastrar" />
            </form>

            <h2 className="font-bold text-white mb-4 text-2xl">Meus links</h2>

            {links && links.map((item) => (
                <article
                    key={item.id}
                    className="flex items-center justify-between w-11/12 max-w-xl rounded py-3 px-2 mb-2 select-none"
                    style={{ backgroundColor: item.backgroundColor, color: item.textColor }}
                >
                    <p className="font-medium" >{item.name}</p>
                    <div>
                        <button
                            onClick={() => handleDeleteLink(item.id)}
                            className="border border-dashed py-1 px-2 rounded"
                        >
                            <FiTrash size={18} color="#fff" />
                        </button>
                    </div>
                </article>
            ))}
        </div>
    )
}