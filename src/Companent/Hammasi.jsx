import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Produkt/Home";
import Categori from "../Produkt/Categori";
import Produkt from "../Produkt/Produkt";
import Lokalhost from "./Lokalhost";

function Hammasi() {
  return (
    <div className="flex w-full">
      <Lokalhost />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mahsulotlar" element={<Categori />} />
        <Route path="/kategores" element={<Produkt />} />
      </Routes>
    </div>
  );
}

export default Hammasi;
