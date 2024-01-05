import React from "react";
import Login from "./components/login";
import SignUp from './components/signUp';
import Home from './components/home';
import AddOrEditUser from "./components/AddOrEditUser";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path="/addoredit" element={<AddOrEditUser />}></Route>
          <Route path="/addoredit/:id" element={<AddOrEditUser />}></Route>
          <Route path="/addoredit/:id/view" element={<AddOrEditUser viewMode />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
