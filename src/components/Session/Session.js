import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import styled from 'styled-components';

import "../../assets/reset.css"
import "./style.css"

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
    const [day, setDay] = useState ('');

    const [selected, setSelected] = useState([]);
    const [chosen, setChosen] = useState('')

    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    
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
    
    function Seats() {      
        function sendSeats(event) {
            event.preventDefault()
            
            const requisicao = axios.post("https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many")
        }
    }
    

    return (
        <>
        <Link to={`/`}>
            <header>
                <h1>CINEFLEX</h1>
            </header>
        </Link>
        <Main>
            <Title>
                <h2>Selecione os assentos</h2> 
            </Title>
            <SeatsRow>
            {
                seats.map((seat, index) => (
                    <Seat isAvailable={seat.isAvailable} setSelect={setSelected} chosen={chosen} key={index} onClick={() => seat.isAvailable ? setChosen([...selected, chosen]) & console.log(selected) : null}>
                        {seat.name}
                    </Seat>                    
                ))
            }
            </SeatsRow>
            <SeatLabel>
                <div><Seat selected={true}></Seat><span>Selecionado</span></div>
                <div><Seat isAvailable={true}></Seat><span>Disponível</span></div>
                <div><Seat isAvailable={false}></Seat><span>Indisponível</span></div>   
            </SeatLabel>
            <Form>
                <label htmlFor="nome">Nome do comprador:</label>
                <input type="text" id="nome" value={name} placeholder="Digite seu nome..." required onChange={(e) => setName(e.target.value)}/>
                <label htmlFor="number">CPF do comprador:</label>
                <input type="number" id="number" value={cpf} placeholder="Digite seu CPF..." pattern="(/^(\d{3}\.){2}\d{3}\-\d{2}$/)" required onChange={(e) => setCpf(e.target.value)}/>
                <div><Link to={`/sucesso`}><button type="submit">Reservar Assento(s)</button></Link></div>
            </Form>
            
        </Main>
        {
            info ? <Footer
            url={movie.posterURL}
            title={movie.title}
            weekday={day.weekday}
            date={info.name}          
            /> : null

        }
        
        </>
    )
}

const Title = styled.div`
    height: 10vh;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Main = styled.main`
    width: 100%;
    height: 79vh;
    margin-top: 8vh;
    margin-bottom: 13vh;

    h2 {
        font-size: 24px;
    }

`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    padding: 30px 24px;
    
    
    label {
        font-size: 18px;
        padding: 1px;
    }
    input {
        height: 51px;
        width: 100%;
        margin-bottom: 7px;
        border-radius: 3px;
        border: 1px solid #D4D4D4;
            
    }

    input:focus {
        border: none
    }

    input::-webkit-input-placeholder { /* Edge */
        color: #AFAFAF;
        font-size: 18px;
        font-style: italic;
        text-indent: 20px; 
    }

    input:-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: #AFAFAF;
        font-size: 18px;
        font-style: italic;
        text-indent: 20px;
    }

    input::placeholder {
        color: #AFAFAF;
        font-size: 18px;
        font-style: italic;
        text-indent: 20px;
    }

    div {
        display: flex;
        justify-content: center;
    }

    button {
        margin-top: 40px;
        width: 225px;
        height: 42px;
        text-align: center;
        background-color: #E8833A;
        color: #FFFFFF;
        font-size: 18px;
        border: none;
        border-radius: 3px;

    
    }

    



`

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
    background-color: ${props => props.selected ? '#8DD7CF' : props.isAvailable ? '#C3CFD9' :'#FBE192'};

`

const Foot = styled.footer`
    width: 100%;
    height: 13vh;
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

