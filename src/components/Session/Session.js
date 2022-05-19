import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import styled from 'styled-components';

import Footer from "../Footer/Footer";

import "../../assets/reset.css"
import "./style.css"


function Seats( {id, name, isAvailable} ) {
    return (
            <Seat isAvailable={isAvailable} >
                {name}
            </Seat>        
    );
}


export default function Session() {
    const [seats, setSeats] = useState([]);
    const [info, setInfo] = useState([])
    const { idsessao } = useParams();
    
    

    useEffect(() =>{
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idsessao}/seats`)
        promise.then((response) =>{
            setSeats(response.data.seats)
            setInfo(response.data)
            console.log(response.data)
            console.log(response.data.seats)

        });
    }, []);

    return (
        <>
        <header>
            <h1>CINEFLEX</h1>
        </header>
        <main>
            <div className="title center">
                <h2>Selecione o horário</h2> 
            </div>
            <SeatsRow>
            {
                seats.map((seat, index) => (
                    <Seats
                    key={index}
                    id={seat.id}
                    name={seat.name}
                    isAvailable={seat.isAvailable}                    
                    /> 
                ))
            }
            </SeatsRow>

        </main>
        <Footer
        
          
        />
        </>

    )
}

const SeatsRow = styled.div`
    width: 100%;
    height: 200px;
    padding: 0 24px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
`

const Seat = styled.div`
    width: 26px;
    height: 26px;
    border: 1px solid #808F9D;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 4px;
    border-radius: 50%;
    font-size: 11px;
    color: #333;
    font-weight: 400px;
    text-align: center;
    background-color: ${props => props.isAvailable ? '#FBE192' : '#C3CFD9'}
`