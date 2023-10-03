import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Template from "./Template";
import ViewNews from "./COMPONENT/ViewNews";
import Category from "./COMPONENT/Category";
import Epaper from "./COMPONENT/Epaper/EpaperComponent";
import Epaper_details from "./COMPONENT/Epaper/Epaper_details";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:id" element={<Template />} />
         <Route path="/:id/DetailedNews/:newsId" element={<ViewNews />} />
        <Route path="/:id/category/:category" element={<Category />} />
        <Route path="/:id/Epaper/" element={<Epaper />} />
        <Route path="/:id/Epaper/:EpaperId" element={<Epaper_details />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
