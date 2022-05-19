import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import styled from 'styled-components';

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

function MovieSection ( {date, id, showtimes, weekday, url} ) {
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


export default function Movie ( { url }) {
    const [sections, setSections] = useState([]);
    const [info, setInfo] = useState([])
    const { idfilme } = useParams();
    console.log(info)

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idfilme}/showtimes`);

        promise.then((response) => {
            setSections(response.data.days);
            setInfo(response.data)
            console.log(response.data.days)
            console.log(response.data)
            
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
                {
                    sections.map((section, index) => (
                        <MovieSection
                        key={index}
                        date={section.date}
                        id={section.id}
                        showtimes={section.showtimes}
                        weekday={section.weekday}
                        url= {url} 
                        /> 
                    ))
                }
                

            </main>
            <Footer 
            url={info.posterURL}
            title={info.title}
            />       
        </>
        
    )
}

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