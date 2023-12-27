import { Router, Route, Routes, Switch } from "react-router-dom"
import "./Style.css";
import {motion} from 'framer-motion';

import Home from "./home";
import Register from "./components/register";
import Next_Re from "./components/next_re";

import  Quiz  from "./components/Quiz";
import  Questions  from "./Questions/Questions";

function App() {

  return (
    <div className="App">
    <Routes>
      <Route path='/register' element={<Register  />}/>
      <Route path='/next_re' element={<Next_Re />}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/quiz'  element={<Quiz/>}/>
      <Route path='/questions'  element={<Questions/>}/>
    </Routes>
  </div>
  );
}

export default App;
