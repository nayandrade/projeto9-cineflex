import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Movie from "./Movie/Movie.js";   
import Session from "./Session/Session";
import Sucess from "./Sucess/Sucess";

import "../assets/reset.css"

export default function App() {
    




    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/filme/:idfilme" element={<Movie />} />
                <Route path="/sessao/:idsessao" element={<Session />} />
                <Route path="/sucesso" element={<Sucess />} />                
            </Routes>
        </BrowserRouter>
    )
}