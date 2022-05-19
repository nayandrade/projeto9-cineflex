import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import "../../assets/reset.css"
import "./style.css"


function Showtime ( {showtime, id, index} ) {
    return (
        <Link to={`/sessao/${id}`}>
            <div className="button">
                {showtime}
            </div>
        </Link>
        

    )
}

function MovieSection ( {date, id, showtimes, weekday} ) {
    console.log(showtimes)

    return (
        <section>
            <span>
                    {weekday} - {date}
            </span>
            <div className="flex">
                {
                    showtimes.map((showtime, index) => (
                        <Showtime
                        key={index} 
                        showtime={showtime.name}
                        id={showtime.id}
                        index={index}
                        />                                           
                    ))
                }               
                
            </div>
        </section>
    )

}



export default function Movie () {
    const [sections, setSections] = useState([]);
    const { idfilme } = useParams();

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idfilme}/showtimes`);

        promise.then((response) => {
            setSections(response.data.days);
            console.log(response.data.days)
            
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
            {
                sections.map((section, index) => (
                    <MovieSection
                    key={index}
                    date={section.date}
                    id={section.id}
                    showtimes={section.showtimes}
                    weekday={section.weekday} 
                    /> 
                ))
            }
            

        </main>
        
        
        
        </>
        
    )
}