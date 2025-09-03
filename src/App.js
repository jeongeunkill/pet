import React, {createContext, useState} from "react";
import {Routes, Route} from "react-router-dom";


import Brand from "./page/Brand";
import Cart from "./page/Cart";
import Community from "./page/Community";
import Global from "./page/Global";
import Login from "./page/Login";
import Offline from "./page/Offline";
import Store from "./page/Store";
import Join from "./page/Join";
import Home from "./page/Home";
import Header from "./components/Header";
import FreshDetail from './components/FreshDetail.jsx';
import LocationDetail from './components/LocationDetail.jsx';
import data from './data/datafresh.js';
import Footer from './components/Footer.jsx'
import './App.scss';
const DataFreshContext=createContext();
function App() {
  
  const [freshData]=useState(data);
 
  //console.log(freshData)
  return (
   <DataFreshContext.Provider value={{freshData}}>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/login" element={<Login />} />
          <Route path="/offline" element={<Offline />} />
          <Route path="/global" element={<Global />} />
          <Route path="/community" element={<Community />} />
          <Route path="/brand" element={<Brand />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/join" element={<Join />} />
          <Route path="/fresh/:id" element={<FreshDetail />} />
          <Route path="/location/:id" element={<LocationDetail />} />
        </Routes>
        <Footer/>
      </div>
   </DataFreshContext.Provider>
  );
}

export default App;
export {DataFreshContext}
