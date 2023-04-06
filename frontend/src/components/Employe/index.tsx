import { FC } from "react";
import { MyContainer } from "./Container"
import { Header } from "./Header"
import { Tableau } from './Tableau';

export const Employe:FC = ()=>{
    
    return (
        <MyContainer>
        <Header />
        <Tableau />
      </MyContainer>
    )

}