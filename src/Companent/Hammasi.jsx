import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Produkt/Home/Home";
import Categori from "../Produkt/Catigores/Categori";
import Produkt from "../Produkt/Produkt/Produkt";
import Ijaralar from "../Produkt/Ijaralar/Ijaralar";
import UserPeg from "../Produkt/Kitobxonlar/UserPeg";
import EditUser from "../Produkt/EditUser/EditUser";
import Kitoblarim from "../Produkt/kitoblarim/Kitoblarim";

function Hammasi() {
  return (
    <div className="flex w-full">

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mahsulotlar" element={<Categori />} />
        <Route path="/kategores" element={<Produkt />} />
        <Route path="/ijaralar" element={<Ijaralar />} />
        <Route path="/userpeg" element={<UserPeg />} />
        <Route path="/edituser" element={<EditUser />} />
        <Route path="/Kitoblarim" element={<Kitoblarim />} />
      </Routes>
    </div>
  );
}

export default Hammasi;
