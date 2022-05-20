import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import styled from 'styled-components';


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

function Seats ( {name, isAvailable, id, selected, setSelected, chosen, setChosen} ) {

    function Chose() {
        if(isAvailable && !chosen) {
            setChosen(!chosen)
            setSelected([...selected, id])
            console.log(selected)
            console.log(id)
        } else {
            setChosen(!chosen)
        }
    }    

    return (
        <Seat isAvailable={isAvailable} chosen={chosen} onClick={Chose}>
            {name}
        </Seat>
    )
}


export default function Session() {
    const [seats, setSeats] = useState([]);
    const [info, setInfo] = useState(null);
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

    return (
        <>
        
        <Header>
            <Link to={`/`}>
                <h1>CINEFLEX</h1>
            </Link>
        </Header>
        
        <Main>
            <Title>
                <h2>Selecione os assentos</h2> 
            </Title>
            <SeatsRow>
            {
                info?.seats.map((seat, index) => (
                    <Seats 
                    isAvailable={seat.isAvailable}
                    name={seat.name}
                    id={seat.id}
                    key={index}
                    selected={selected}
                    setSelected={setSelected}
                    chosen={chosen}
                    setChosen={setChosen}

                    />   
                                        
                )) 
            }

            </SeatsRow>
            <SeatLabel>
                <div><Seat chosen={true}></Seat><span>Selecionado</span></div>
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
            <Footer
            url={info?.movie.posterURL}
            title={info?.movie.title}
            weekday={info?.day.weekday}
            date={info?.name}          
            />

        }
        
        </>
    )
}

    
    // function Seats() {

        // function filterSeats(seats) {

        //     const newSeats = seats.filter(function(ele , pos){
        //     return seats.indexOf(ele) == pos;
        //     }) 

        //     console.log("array filtrada ",newSeats);
        // }
        
    
    //     function sendSeats(event) {
    //         event.preventDefault()
            
    //         const requisicao = axios.post("https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many")
    //     }
    // }
    
    const Header = styled.header`
    font-family: 'Roboto', sans-serif;  
    width: 100%;
    height: 67px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    position: fixed;
    top: 0;
    left: 0;
    

    h1 {
    font-size: 34px;
    color: #E8833A;
    }

    a:-webkit-any-link {
    text-decoration: none;
}
`

const Title = styled.div`
    height: 10vh;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Main = styled.main`
    font-family: 'Roboto', sans-serif;  
    width: 100%;
    height: 100%;
    margin: 67px 0 117px 0;

    h2 {
        font-size: 24px;
        color: #293845;

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
    background-color: ${props => props.chosen ? '#8DD7CF' : props.isAvailable ? '#C3CFD9' :'#FBE192'};

`

const Foot = styled.footer`
    font-family: 'Roboto', sans-serif;
    width: 100%;
    height: 117px;
    display: flex;
    align-items: center;
    background-color: #DFE6ED;
    border-top: 2px solid #9EADBA;
    position: fixed;
    bottom: 0;
    left: 0;  
    

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

