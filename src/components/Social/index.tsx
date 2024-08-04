import { ReactElement } from "react"

interface SocialProps {
    children: ReactElement
    url: string
}

export const Social = ({ children, url }: SocialProps) => {
    return (
        <a href={url}
            rel="noopener noreferrer"
            target="_blank" >
            {children}
        </a>
    )
}