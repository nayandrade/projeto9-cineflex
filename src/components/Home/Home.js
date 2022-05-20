import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from 'styled-components';


function MovieBanner ( {id, url, title } ) {
    return (
        <Link to={`/filme/${id}` }>
            <Movie>
                <img src={url} alt="movie"></img>
            </Movie>      
        </Link>       
    )
}

export default function Home() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
      const requisicao = axios.get(
        "https://mock-api.driven.com.br/api/v5/cineflex/movies"
      );
  
      requisicao.then((response) => {
        setMovies(response.data)
        console.log(response.data);
      });
    }, []);

    return (
        <Body>
            <Header>
                <h1>CINEFLEX</h1>
            </Header>
            <Main>
                <Title>
                    <h2>Selecione o filme</h2> 
                </Title>
                <Pic>
                    {
                        movies.map((movie, index) => (
                            <MovieBanner
                            key={index}
                            id={movie.id} 
                            url={movie.posterURL}
                            title={movie.title}
                            />                        
                        ))
                    }                
                </Pic>                        
            </Main>
        
        </Body>        
    )
    
}

const Body = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    font-family: 'Roboto', sans-serif;
`

const Header = styled.header`
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
`
const Main = styled.main`
    width: 100%;
    height: 92vh;
    margin-top: 67px;

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

const Pic = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;    
`

const Movie = styled.div`
    box-sizing: content-box;
    width: auto;
    height: auto;
    padding: 8px;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;

    img {
    width: 129px;
    height: 193px;
}
`


