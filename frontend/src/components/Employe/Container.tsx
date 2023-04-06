import { Container } from "@mui/system"
import { FC, PropsWithChildren } from "react"

type Props = PropsWithChildren<{
}>


export const MyContainer:FC<Props> = ({children})=>{
    
    
    return (
                <Container maxWidth="lg" sx={{}}>    
                         {children}
                </Container>
            )
}