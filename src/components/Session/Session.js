import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import styled from 'styled-components';

import "../../assets/reset.css"
import "./style.css"



function Seats( {name, isAvailable, setSelected, selected} ) {

    return (
        <div onClick={isAvailable ? () => setSelected(true) : null} >
            <Seat isAvailable={isAvailable} isSelected={selected}>
                {name}
            </Seat>
        </div>        
    );
}

function Footer ( {url, title, weekday, date } ) {
    return (
        <>
        <Foot>
            <div>
                <img src={url} alt="movie"></img>
            </div>
            <div>
                <p>{title}</p>
                <p> {weekday} - {date} </p>
            </div>                
        </Foot>
        </>
    )
}


export default function Session() {
    const [seats, setSeats] = useState([]);
    const [info, setInfo] = useState([]);
    const [movie, setMovie] = useState ({})
    const [selected, setSelected] = useState(false)
    const [day, setDay] = useState ('')
    const { idsessao } = useParams();

    useEffect(() =>{
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idsessao}/seats`)
        promise.then((response) =>{
            setSeats(response.data.seats)
            setInfo(response.data)
            setDay(response.data.day)
            setMovie(response.data.movie)
            console.log(response.data)
            console.log(response.data.seats)

        });
    }, []);   

    return (
        <>
        <Link to={`/`}>
            <header>
                <h1>CINEFLEX</h1>
            </header>
        </Link>
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
                    setSelected={setSelected}
                    selected={selected}                   
                    /> 
                ))
            }
            </SeatsRow>
            <SeatLabel>
                <div><Seat isSelected={true}></Seat><span>Selecionado</span></div>
                <div><Seat isAvailable={true}></Seat><span>Disponível</span></div>
                <div><Seat isAvailable={false}></Seat><span>Indisponível</span></div>   
            </SeatLabel>
            
        </main>
        <Footer
        url={movie.posterURL}
        title={movie.title}
        weekday={day.weekday}
        date={info.name}          
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
const SeatLabel =styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-top: 30px;

    div{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        font-weight: 400;
    }
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
    background-color: ${props => props.isSelected ? '#8DD7CF' : props.isAvailable ? '#C3CFD9' :'#FBE192'};

`

const Foot = styled.div`
    width: 100%;
    height: 117px;
    display: flex;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    background-color: #DFE6ED;
    border-top: 2px solid #9EADBA;
    

    div:first-child {
        width: 64px;
        height: 89px;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 10px;
    }


    img {
        box-sizing: content-box;
        width: 48px;
        height: 72px;
        

    }

    p {
        font-size: 26px;
        margin: 0 10px;
    }

`

