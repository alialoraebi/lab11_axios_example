import logo from './logo.svg';
import './App.css';
import PersonList from "./components/PersonList";
import Home from "./components/Home";
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

function App() {
  return (
      <div>
          <h1>Week 11 - Axios Examples</h1>
          <BrowserRouter>
              <nav>
                  <NavLink to="/home">Home</NavLink>
                  <NavLink to="/person">Persons</NavLink>
              </nav>

              <Routes>
                  <Route path="/person" element={<PersonList/>} />
                  <Route path="/home" element={<Home/>} />
              </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
