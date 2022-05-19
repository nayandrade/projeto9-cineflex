import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import Footer from "../Footer/Footer";

import "../../assets/reset.css"
import "./style.css"


export default function Session() {
    const [seats, setSeats] = useState([]);
    const { idsessao } = useParams();
    

    useEffect(() =>{
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idsessao}/seats`)
        promise.then((response) =>{
            setSeats(response.data)
            console.log(response.data)

        });
        
    }, []);

    return (
        <>
        eu sou os assentos
        <Footer 
        
        />
        </>

    )
}