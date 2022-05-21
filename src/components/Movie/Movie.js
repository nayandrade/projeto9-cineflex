import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import styled from 'styled-components';

function Showtime ( {showtime, id} ) {
    return (
        <Link to={`/sessao/${id}`}>
            <Button>
                {showtime}
            </Button>
        </Link>       
    )
}

function MovieSection ( {date, showtimes, weekday} ) {
    

    return (
        <Section>
            <span>
                    {weekday} - {date}
            </span>
            <div>
                {
                    showtimes.map((showtime, index) => (
                        <Showtime
                        key={index} 
                        showtime={showtime.name}
                        id={showtime.id}                        
                        />                                           
                    ))
                }               
                
            </div>
        </Section>
    )
}

function Footer ( {url, title} ) {
    return (
        <>
        <Foot>
            <div>                
                <img src={url} alt="movie"></img>
            </div>
            <div>
                <p>{title}</p>
            </div>            
            
        </Foot> 
        </>
    )
}


export default function Movie () {
    const [sections, setSections] = useState([]);
    const [info, setInfo] = useState([])
    const { idfilme } = useParams();

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idfilme}/showtimes`);

        promise.then((response) => {
            setSections(response.data.days);
            setInfo(response.data)            
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
                    <h2>Selecione o horário</h2> 
                </Title>
                {
                    sections.map((section, index) => (
                        <MovieSection
                        key={index}
                        date={section.date}                        
                        showtimes={section.showtimes}
                        weekday={section.weekday}                        
                        /> 
                    ))
                }
                

            </Main>
            <Footer 
            url={info.posterURL}
            title={info.title}
            />       
        </>
        
    )
}

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
const Title = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 90px;
    text-align: center;
`
const Section = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 0 24px;
    margin-bottom: 13px;

    span {
    font-family: 'Roboto', sans-serif;
    margin-bottom: 22px;
    padding-top: 10px
    }

    div {
    display: flex;
    margin-bottom: 10px;
    }

    a:-webkit-any-link {
    text-decoration: none;
    }

`

const Button = styled.div`
    width: 83px;
    height: 43px;
    background-color: #E8833A;
    color: #fff;
    border-radius: 3px;
    margin-right: 8px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
`

