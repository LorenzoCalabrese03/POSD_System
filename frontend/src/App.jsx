import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './pages/Component/NavBar & SearchBar/NavBar.jsx';
import Searchbar from './pages/Component/NavBar & SearchBar/Searchbar.jsx';
import Home from './pages/Component/PagineMenu/Home.jsx';
import './App.css';
import Feedback from "./pages/Component/PagineMenu/Feedback.jsx";
import Contatti from "./pages/Component/PagineMenu/Contatti.jsx";
import POSD from "./pages/Component/PagineMenu/POSD.jsx";
import Registrazione from "./pages/Component/PagineMenu/Registrazione.jsx";
import Full from "./pages/Component/Risultati/Full.jsx";
import Information from "./pages/Component/Risultati/Information.jsx";
import { useState, useEffect } from 'react';
import Error from "./pages/Component/Error.jsx"

function App() {
  const [patterns, setPatterns] = useState([]);

  useEffect(() => {
    const initialPatterns = [];
    setPatterns(initialPatterns);
  }, []);

  return (
    <Router>
      <div>
        <NavBar />
        <div className='flex justify-between items-center'>
          <Searchbar />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Feedback" element={<Feedback />} />
          <Route path="/Contatti" element={<Contatti />} />
          <Route path="/POSD" element={<POSD />} />
          <Route path="/Registrazione" element={<Registrazione />} />
          <Route path="/Full/:title" element={<Full patterns={patterns} />} />
          <Route path="/Information/:title" element={<Information />} />
          <Route path="/Error" element={<Error/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
