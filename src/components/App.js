import React from "react"

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Movie from "./Movie/Movie.js";   
import Session from "./Session/Session";
import Sucess from "./Sucess/Sucess";

import "../assets/reset.css"

export default function App() {
    const [seats, setSeats] = React.useState([]);
    const [name, setName] = React.useState('');
    const [cpf, setCpf] = React.useState('');
    const [info, setInfo] = React.useState(null);
    const [selected, setSelected] = React.useState([]);
    const [selectedSeat, setSelectedSeat] = React.useState([]);
    
    const [movie, setMovie] = React.useState ({})
    const [day, setDay] = React.useState ('');


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/filme/:idfilme" element={<Movie />} />
                <Route path="/sessao/:idsessao" element={<Session 
                movie={movie} 
                setMovie={setMovie}
                day={day}
                setDay={setDay}
                info={info}
                setInfo={setInfo}
                selected={selected}
                setSelected={setSelected}
                selectedSeat={selectedSeat}
                setSelectedSeat={setSelectedSeat}
                seats={seats} 
                setSeats={setSeats}
                name={name}
                setName={setName}
                cpf={cpf}
                setCpf={setCpf}/> } />
                <Route path="/sucesso" element={<Sucess
                movie={movie}
                day={day}
                info={info}
                selected={selected}
                selectedSeat={selectedSeat} 
                seats={seats} 
                setSeats={setSeats}
                name={name}
                setName={setName}
                cpf={cpf}
                setCpf={setCpf}/> } />                
            </Routes>
        </BrowserRouter>
    )
}