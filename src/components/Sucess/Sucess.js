import { Link, useNavigate } from "react-router-dom";
import styled from 'styled-components';

export default function Sucess( {movie, setMovie, day, setDay, info, setInfo, setSelected, selectedSeat, setSelectedSeat, setSeats, name, setName, cpf, setCpf} ) {
    const navigate = useNavigate();

    function Return () {
        setSeats([]);
        setName('');
        setCpf('');
        setInfo(null);
        setSelected([]);
        setSelectedSeat([]);
        setMovie({});
        setDay('');
        navigate("/", { replace: true })
    }

    return (
        <>
        <Header>
            <Link to={`/`}>
                <h1>CINEFLEX</h1>
            </Link>
        </Header>
        <Main>
            <Title>
                <h2>Pedido feito <br /> com sucesso!</h2> 
            </Title>
            <Section>
                <h3>Filme e sessão</h3>
                <span>{movie.title}</span>
                <span>{day.date} {info?.name}</span>
            </Section>
            <Section>
                <h3>Ingressos</h3>
                {
                    selectedSeat.map((e) => (
                        <span>Assento {e}</span>
                    ))
                }
                
            </Section>
            <Section>
                <h3>Comprador</h3>
                <span>Nome: {name}</span>
                <span>CPF: {cpf}</span>                
            </Section>
            <div><Button onClick={Return}>Voltar pra home</Button>  </div>        
        </Main>  
        </>  
    )
}

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
    height: 90px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
`

const Main = styled.main`
    font-family: 'Roboto', sans-serif;  
    width: 100%;
    height: 100%;
    margin: 67px 0 0;

    h2 {
        font-size: 24px;
        color: #247A6B;
        font-weight: 700;
        line-height: 28.13px;
    }
    div {
        display: flex;
        justify-content: center;
    }

    button a:-webkit-any-link {
        color: inherit;
        text-decoration: none;
    }
`

const Section = styled.section`
    font-family: 'Roboto', sans-serif;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 15px 24px;
    margin: 15px 0;
    color: #293845;
    

    h3 {
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 20px;
    }

    span {
        font-size: 22px;
        font-weight: 400px;     
    }

    div {
        display: flex;
        margin-bottom: 10px;
    }

    a:-webkit-any-link {
        text-decoration: none;
    }
`

const Button = styled.button`
    margin-top: 40px;
    width: 225px;
    height: 42px;
    text-align: center;
    background-color: #E8833A;
    color: #FFFFFF;
    font-size: 18px;
    border: none;
    border-radius: 3px;
`