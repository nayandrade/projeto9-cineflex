import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Movie from "./Movie/Movie.js";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/filme/:idfilme" element={<Movie />} />                
            </Routes>
        </BrowserRouter>
    )
}