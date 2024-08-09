import { Social } from "../../components/Social"
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa"
import { collection, getDoc, getDocs, orderBy, query, doc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { LinkProps } from "../../types/links.types"
import { db } from "../../services/firebaseConnection"

interface SocialLinksProps {
    youtube: string
    instagram: string
    facebook: string
}

export const Home = () => {
    const [links, setLinks] = useState<LinkProps[]>()
    const [socialLinks, setSocialLinks] = useState<SocialLinksProps>()

    useEffect(() => {
        async function loadingLinks() {
            const linksRef = collection(db, "links");
            const queryRef = query(linksRef, orderBy("createdAt", "asc"))

            await getDocs(queryRef).then((snapshot) => {
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
                })

                setLinks(lista)
            }).catch(() => {

            })
        }

        loadingLinks()
    }, [])

    useEffect(() => {
        async function loadingSocialLinks() {
            const docRef = doc(db, "social", "link")
            await getDoc(docRef).then((snapshot) => {
                if (snapshot.data !== undefined) {
                    setSocialLinks({
                        youtube: snapshot.data()?.youtube,
                        instagram: snapshot.data()?.instagram,
                        facebook: snapshot.data()?.facebook,
                    })
                }
            })
        }

        loadingSocialLinks()
    }, [])

    return (
        <div className="w-full flex flex-col justify-center items-center py-4" >
            <h1 className="md:text-4xl text-3xl font-bold text-white mt-20" >Leonardo Nunes Martinha</h1>
            <span className="text-gray-50 mb-5 mt-3" >Veja meus links 👇🏻</span>
            <main className="flex flex-col w-11/12 max-w-xl text-center" >
                {links && links.map((item) => (
                    <section
                        key={item.id}
                        className="mb-4 w-full py-2 rounded-lg select-none transition-transform hover:scale-105"
                        style={{ backgroundColor: item.backgroundColor, color: item.textColor }}
                    >
                        <a href={item.url} target="_blank">
                            <p className="text-base md:text-lg" >
                                {item.name}
                            </p>
                        </a>
                    </section>
                ))}
                {socialLinks && Object.keys(socialLinks).length > 0 && (
                    <footer className="flex justify-center gap-3 my-4" >
                        <Social url={socialLinks.facebook}>
                            <FaFacebook size={35} color="#fff" />
                        </Social>
                        <Social url={socialLinks.instagram} >
                            <FaInstagram size={35} color="#fff" />
                        </Social>
                        <Social url={socialLinks.youtube} >
                            <FaYoutube size={35} color="#fff" />
                        </Social>
                    </footer>
                )}
            </main>
        </div>
    )
}