import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";



import "../../assets/reset.css"
import "./style.css"

function MovieBanner ( {url, id} ) {
    console.log(id)
    return (
        <Link to={`/filme/${id}`}>
            <div className="movie">
                <img src={url} alt="movie"></img>
            </div>      
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
        <>
        <header>
            <h1>CINEFLEX</h1>
        </header>
        <main>
            <div className="title center">
                <h2>Selecione o filme</h2> 
            </div>
            <div className="movies">
                {
                    movies.map((movie, index) => (
                        <MovieBanner
                        key={index}
                        id={movie.id} 
                        url={movie.posterURL}
                        />                        
                    ))
                }                
            </div>
                      
        </main>
        </>        
    )
    
}
