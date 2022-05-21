import { useState} from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./Home/Home";
import Movie from "./Movie/Movie.js";   
import Session from "./Session/Session";
import Sucess from "./Sucess/Sucess";

import "../assets/reset.css"

export default function App() {
    const [seats, setSeats] = useState([]);
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [info, setInfo] = useState(null);
    const [selected, setSelected] = useState([]);
    const [selectedSeat, setSelectedSeat] = useState([]);    
    const [movie, setMovie] = useState ({})
    const [day, setDay] = useState ('');

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/filme/:idfilme" element={<Movie />} />
                <Route path="/sessao/:idsessao" element={
                    <Session                        
                        setMovie={setMovie}                        
                        setDay={setDay}
                        info={info}
                        setInfo={setInfo}
                        selected={selected}
                        setSelected={setSelected}
                        selectedSeat={selectedSeat}
                        setSelectedSeat={setSelectedSeat}                         
                        setSeats={setSeats}
                        name={name}
                        setName={setName}
                        cpf={cpf}
                        setCpf={setCpf}
                    /> } 
                />
                <Route path="/sucesso" element={
                    <Sucess
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
                        setCpf={setCpf}
                    /> } 
                />                
            </Routes>
        </BrowserRouter>
    )
}